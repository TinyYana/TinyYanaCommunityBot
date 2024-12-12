import * as fs from 'fs';
import { BotConfig } from '../interfaces/BotConfig';

let cachedConfig: BotConfig | null = null;

export function getConfig(): BotConfig {
    if (!cachedConfig) {
        try {
            const configData = fs.readFileSync('config.json', { encoding: 'utf8' });
            cachedConfig = JSON.parse(configData) as BotConfig;
        } catch (error) {
            console.error('讀取 config.json 失敗:', error);
            process.exit(1);
        }
    }
    return cachedConfig;
}

export function createDefaultConfig() {
    if (!fs.existsSync('config.json')) {
        const defaultConfig: BotConfig = {
            welcomeService: {
                channelId: 'default-channel-id',
                title: 'Welcome!',
                description: 'Welcome to the server!'
            },
            leaveService: {
                channelId: 'default-channel-id'
            },
            dynamicVoiceChannel: {
                triggerChannelId: ''
            }
        };
        fs.writeFileSync('config.json', JSON.stringify(defaultConfig, null, 2), { encoding: 'utf8' });
    }
}
