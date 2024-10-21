const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('report').setDescription('Report an issue'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('reportModal')
            .setTitle('Report an Issue');

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Describe the issue')
            .setStyle(TextInputStyle.Paragraph);

        const row = new ActionRowBuilder().addComponents(descriptionInput);
        modal.addComponents(row);

        await interaction.showModal(modal);
    }
};
