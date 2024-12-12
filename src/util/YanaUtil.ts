import { Guild } from "discord.js";

export async function fetchTextChannel(guild: Guild, channelId: string) {
    const channel = await guild.channels.fetch(channelId);
    if (channel?.isTextBased()) {
        return channel;
    }
    console.error(`Channel with ID ${channelId} is not text-based or not found.`);
    return null;
}
