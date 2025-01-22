import Discord, {
    ActionRowBuilder,
    ModalBuilder, TextInputBuilder
} from "discord.js";

export default class EmbedSenderModal {
    async createModal(): Promise<ModalBuilder> {
        const modal = new ModalBuilder().setCustomId('embedSender').setTitle("Embed 訊息傳送器");

        const titleInput = new TextInputBuilder()
            .setCustomId('titleInput')
            .setLabel("標題")
            .setStyle(Discord.TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('descriptionInput')
            .setLabel("內文")
            .setStyle(Discord.TextInputStyle.Paragraph);

        const imageURL = new TextInputBuilder()
            .setCustomId('imageUrl')
            .setLabel("圖片網址")
            .setRequired(false)
            .setStyle(Discord.TextInputStyle.Short);

        const channelToSend = new TextInputBuilder()
            .setCustomId('channelSend')
            .setLabel("目標頻道 ID")
            .setStyle(Discord.TextInputStyle.Short);

        const notify = new TextInputBuilder()
            .setCustomId('notify')
            .setLabel("通知用戶（填寫 true 或 false）")
            .setStyle(Discord.TextInputStyle.Short);

        const titleActionRow: ActionRowBuilder<Discord.ModalActionRowComponentBuilder> = new ActionRowBuilder<Discord.ModalActionRowComponentBuilder>()
            .addComponents(titleInput);

        const descriptionActionRow: ActionRowBuilder<Discord.ModalActionRowComponentBuilder> = new ActionRowBuilder<Discord.ModalActionRowComponentBuilder>()
            .addComponents(descriptionInput);

        const imageActionRow: ActionRowBuilder<Discord.ModalActionRowComponentBuilder> = new ActionRowBuilder<Discord.ModalActionRowComponentBuilder>()
            .addComponents(imageURL);

        const channelActionRow: ActionRowBuilder<Discord.ModalActionRowComponentBuilder> = new ActionRowBuilder<Discord.ModalActionRowComponentBuilder>()
            .addComponents(channelToSend);

        const notifyActionRow: ActionRowBuilder<Discord.ModalActionRowComponentBuilder> = new ActionRowBuilder<Discord.ModalActionRowComponentBuilder>()
            .addComponents(notify);

        modal.addComponents([titleActionRow, descriptionActionRow, imageActionRow, channelActionRow, notifyActionRow]);
        return modal;
    }
}