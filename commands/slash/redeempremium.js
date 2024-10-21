const PremiumCode = require('../../models/premiumCode');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('redeempremium')
        .setDescription('Redeem a premium code.')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Enter the premium code.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const inputCode = interaction.options.getString('code');
        const codeEntry = await PremiumCode.findOne({ code: inputCode });

        if (!codeEntry) {
            return interaction.reply({ content: '❌ Invalid premium code.', ephemeral: true });
        }

        if (codeEntry.redeemedBy) {
            return interaction.reply({ content: '❌ This code has already been redeemed.', ephemeral: true });
        }

        codeEntry.redeemedBy = interaction.user.id;
        await codeEntry.save();

        await interaction.reply({
            content: `🎉 Successfully redeemed the premium code! You now have premium access for **${codeEntry.duration}**.`,
            ephemeral: true
        });
    }
};
