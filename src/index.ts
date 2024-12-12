import { Client, GatewayIntentBits } from 'discord.js';
import * as fs from "fs";
import JoinLeaveMessageHandler from './services/JoinLeaveMessageHandler';
import { BotConfig } from './interfaces/BotConfig';
import { createDefaultConfig, getConfig } from './util/ConfigLoader';

const Token: { token: string } = JSON.parse(fs.readFileSync('token.json', {
    encoding: 'utf8'
}));

const config: BotConfig = getConfig();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    createDefaultConfig();
    console.log(`${client.user?.tag} 啟動!`);
});

const joinLeaveMessageHandler = new JoinLeaveMessageHandler(config);

client.on('guildMemberAdd', async (member) => {
    await joinLeaveMessageHandler.sendWelcomeMessage(member, member.guild);
});

client.on('guildMemberRemove', async (member) => {
    await joinLeaveMessageHandler.sendQuitMessage(member, member.guild);
});

client.on('error', (error) => {
    console.log(error)
});
process.on('unhandledRejection', (rejection) => {
    console.log(rejection)
});
process.on('uncaughtException', (exception) => {
    console.log(exception)
});

client.login(Token.token);