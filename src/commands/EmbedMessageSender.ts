import { Client, SlashCommandBuilder } from "discord.js";
import { logger } from "../utils/YanaUtil";

class EmbedMessageSender {
    constructor(client: Client) {
        client.once('ready', () => {
            const builder = new SlashCommandBuilder();
            builder
                .setName('embed')
                .setDescription('Send an embed message to Discord.');
            client.application?.commands.create(builder);
        });
    }
    public sendEmbedMessage(message: string): void {
        // Send message to Discord
    }
}