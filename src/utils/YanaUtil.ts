import { Guild } from "discord.js";
import log4js from "log4js";

export async function fetchTextChannel(guild: Guild, channelId: string) {
    const channel = await guild.channels.fetch(channelId);
    if (channel?.isTextBased()) {
        return channel;
    }
    logger.error(`ID 為 ${channelId} 的頻道不是文字頻道或無法取得頻道。`);
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