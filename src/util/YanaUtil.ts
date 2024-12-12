import { Guild } from "discord.js";
import log4js from "log4js";

export async function fetchTextChannel(guild: Guild, channelId: string) {
    const channel = await guild.channels.fetch(channelId);
    if (channel?.isTextBased()) {
        return channel;
    }
    logger.error(`Channel with ID ${channelId} is not text-based or not found.`);
    return null;
}
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { 
            type: 'dateFile', 
            filename: 'bot.log', 
            pattern: '.yyyy-MM-dd',
            compress: true 
        }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' }
    }
});

export const logger = log4js.getLogger();

logger.level = 'debug';