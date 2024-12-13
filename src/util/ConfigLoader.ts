import * as fs from 'fs';
import { BotConfig } from '../interfaces/BotConfig';
import { logger } from './YanaUtil';

let cachedConfig: BotConfig | null = null;

export function getConfig(): BotConfig {
    if (!cachedConfig) {
        try {
            const configData = fs.readFileSync('config.json', { encoding: 'utf8' });
            cachedConfig = JSON.parse(configData) as BotConfig;
        } catch (error) {
            logger.error('讀取 config.json 失敗:', error);
            process.exit(1);
        }
    }
    return cachedConfig;
}

export function createDefaultConfig() {
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

    if (!fs.existsSync('config.json')) {
        fs.writeFileSync('config.json', JSON.stringify(defaultConfig, null, 2), { encoding: 'utf8' });
    } else {
        try {
            const existingConfigData = fs.readFileSync('config.json', { encoding: 'utf8' });
            const existingConfig = JSON.parse(existingConfigData) as BotConfig;

            const mergedConfig = { ...defaultConfig, ...existingConfig };
            fs.writeFileSync('config.json', JSON.stringify(mergedConfig, null, 2), { encoding: 'utf8' });
        } catch (error) {
            logger.error('讀取或合併 config.json 失敗:', error);
            process.exit(1);
        }
    }
}
