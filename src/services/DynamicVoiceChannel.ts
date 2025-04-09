import { VoiceState, Channel, PermissionOverwriteOptions, VoiceChannel, Collection } from "discord.js";

const DynamicVoiceChannel: string[] = ["971329900470472744"];
const permission: PermissionOverwriteOptions = {
    ManageChannels: true,
    KickMembers: true,
    MuteMembers: true,
    PrioritySpeaker: true,
    DeafenMembers: true,
    MoveMembers: true,
};

interface PersonChannel {
    [key: string]: Channel; // 用來存儲語音頻道對象
}

let PersonChannel: PersonChannel = {};

export = {
    async execute(oldState: VoiceState, newState: VoiceState): Promise<void> {
        const client = oldState.client || newState.client;
        let oldChannelId: string = oldState.channelId || "";

        // 檢查是否有空的語音頻道，若無成員，則刪除該頻道
        if (PersonChannel[oldChannelId]) {
            const channel = PersonChannel[oldChannelId];

            // 確保只有語音頻道或具有成員集合的頻道才可以使用 `size`
            if (channel instanceof VoiceChannel && channel.members instanceof Collection && channel.members.size === 0) {
                await channel.delete();
                delete PersonChannel[oldChannelId];
            }
        }

        const voiceGuild = await client.guilds.fetch(oldState.guild.id);
        let newChannelId: string = newState.channelId || "";

        // 如果進入特定的語音頻道，則進行處理
        if (DynamicVoiceChannel.includes(newChannelId)) {
            if (!newState.channel) throw new Error("新語音狀態頻道錯誤");
            const NewparentId = newState.channel.parentId;
            if (!newState.member) throw new Error("new成員ID錯誤");

            const voice = await newState.channel.clone();

            await voice.permissionOverwrites.edit(newState.member.id, permission);

            await voice.setName(`${(await voiceGuild.members.fetch(newState.id)).displayName} 的語音頻道`);

            // 設置父類別
            await voice.setParent(NewparentId!, { lockPermissions: false });

            try {
                await voice.setPosition(voice.position + 1);
                await newState.setChannel(voice.id);
            } catch (error) {
                await voice.delete();
            }

            // 儲存新語音頻道
            PersonChannel[voice.id] = voice;
        }
    }
};
