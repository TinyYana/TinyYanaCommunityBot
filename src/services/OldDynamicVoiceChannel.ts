import { VoiceState, VoiceChannel, GuildMember } from "discord.js";
import { BotConfig } from "../interfaces/BotConfig";
import { getConfig } from "../utils/ConfigLoader";
import { logger } from "../utils/YanaUtil";

export default class DynamicVoiceChannelManager {
    private readonly triggerChannelId: string;

    constructor() {
        const config: BotConfig = getConfig();
        this.triggerChannelId = config.dynamicVoiceChannel.triggerChannelId;
    }

    /**
     * 建立新的動態語音頻道
     * @param {VoiceState} newState - 新的語音狀態
     */
    private async createNewDynamicVoiceChannel(newState: VoiceState): Promise<VoiceChannel> {
        const parentVoiceChannel = newState.channel as VoiceChannel;
        const member = newState?.member as GuildMember;

        const newVoiceChannel = await parentVoiceChannel.clone({
            name: `${member.displayName} 的語音頻道`,
        });

        await this.setChannelPermissions(newVoiceChannel, member);

        return newVoiceChannel;
    }

    /**
     * 設置新頻道的權限
     * @param {VoiceChannel} channel - 新語音頻道
     * @param {GuildMember} member - 頻道的擁有者
     */
    private async setChannelPermissions(channel: VoiceChannel, member: GuildMember): Promise<void> {
        await channel.permissionOverwrites.edit(member.user, {
            MuteMembers: true,
            DeafenMembers: true,
            PrioritySpeaker: true,
            ManageChannels: true,
        });
    }

    /**
     * 判斷是否應刪除動態語音頻道
     * @param {VoiceChannel | null} oldVoiceChannel - 舊的語音頻道
     * @param {VoiceChannel} mainChannel - 觸發動態頻道的主頻道
     * @returns {Promise<boolean>}
     */
    private async shouldDeleteVoiceChannel(
        oldVoiceChannel: VoiceChannel | null,
        mainChannel: VoiceChannel
    ): Promise<boolean> {
        if (
            !oldVoiceChannel ||
            oldVoiceChannel.parentId !== mainChannel.parentId ||
            oldVoiceChannel.id === this.triggerChannelId
        ) {
            return false;
        }

        return oldVoiceChannel.members.size === 0;
    }

    /**
     * 處理動態語音頻道的邏輯
     * @param {VoiceState} previousVoiceState - 舊的語音狀態
     * @param {VoiceState} currentVoiceState - 新的語音狀態
     */
    async handleDynamicVoiceChannel(previousVoiceState: VoiceState, currentVoiceState: VoiceState): Promise<void> {
        try {
            // 檢查是否需要建立新語音頻道
            if (currentVoiceState.channel?.id === this.triggerChannelId) {
                const newVoiceChannel = await this.createNewDynamicVoiceChannel(currentVoiceState);
                await currentVoiceState.member?.voice.setChannel(newVoiceChannel);
            }

            // 檢查是否需要刪除舊語音頻道
            if (
                previousVoiceState.channel?.id !== this.triggerChannelId &&
                currentVoiceState.channel?.id !== this.triggerChannelId
            ) {
                const oldVoiceChannel = previousVoiceState.channel as VoiceChannel;
                const mainChannel = await previousVoiceState.guild.channels.fetch(this.triggerChannelId) as VoiceChannel;

                if (await this.shouldDeleteVoiceChannel(oldVoiceChannel, mainChannel)) {
                    await oldVoiceChannel.delete();
                }
            }
        } catch (error) {
            logger.error("動態語音頻道處理錯誤:", error);
        }
    }
}
