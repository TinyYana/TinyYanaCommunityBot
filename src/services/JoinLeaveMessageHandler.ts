import Discord, { EmbedBuilder, Guild, GuildMember, PartialGuildMember, TextChannel } from "discord.js";
import { BotConfig } from "../interfaces/BotConfig";
import { fetchTextChannel } from "../util/YanaUtil";

export default class JoinLeaveMessageHandler {
    constructor(private config: BotConfig) { }

    async sendWelcomeMessage(member: GuildMember, guild: Guild) {
        try {
            const embed = new EmbedBuilder()
                .setTitle(this.config.welcomeService.title)
                .setDescription(this.config.welcomeService.description)
                .setColor(Discord.Colors.LuminousVividPink)
                .setThumbnail(member.user.avatarURL());

            const welcomeChannel = await fetchTextChannel(guild, this.config.welcomeService.channelId);
            if (!welcomeChannel) return;

            await welcomeChannel.send({
                content: `<@${member.id}>`,
                embeds: [embed]
            });
            await member.roles.add('859107233702215690');
        } catch (error) {
            console.error('Failed to send welcome message:', error);
        }
    }

    async sendQuitMessage(member: GuildMember | PartialGuildMember, guild: Guild) {
        try {
            const quitChannel = await fetchTextChannel(guild, this.config.leaveService.channelId);
            if (!quitChannel) return;

            const quitMessage = `:wave: ${member.displayName} 離開了彼岸花社群`;
            await quitChannel.send({
                content: quitMessage
            });
        } catch (error) {
            console.error('Failed to send quit message:', error);
        }
    }
}
