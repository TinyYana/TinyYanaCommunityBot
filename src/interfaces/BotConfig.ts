export interface BotConfig {
    welcomeService: {
        channelId: string;
        title: string;
        description: string;
    };
    leaveService: {
        channelId: string;
    }
    dynamicVoiceChannel: {
        triggerChannelId: string;
    };
}
