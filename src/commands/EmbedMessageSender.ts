import { BaseInteraction, Client, SlashCommandBuilder } from "discord.js";
import EmbedSenderModal from "../modals/EmbedSenderModal";

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
    async openEmbedSenderModal(interaction: BaseInteraction) {
        if (!interaction.isCommand()) return;
        const emberSenderModal = new EmbedSenderModal();
        const modal = await emberSenderModal.createModal();
        interaction.showModal(modal);
    }
    convertToBoolean(input: string): boolean {
        const truthy: string[] = ["true", "True", "1"];
        return truthy.includes(input);
    }

}