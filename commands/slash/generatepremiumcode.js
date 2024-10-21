const generateRandomCode = require('../../utils/generateCode');
const PremiumCode = require('../../models/premiumCode');
const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generatepremiumcode')
        .setDescription('Generate a premium code for a specific duration.')
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Select the duration of the premium code.')
                .setRequired(true)
                .addChoices(
                    { name: '1 Day', value: '1d' },
                    { name: '1 Week', value: '1w' },
                    { name: '1 Month', value: '1m' },
                    { name: '3 Months', value: '3m' },
                    { name: '6 Months', value: '6m' },
                    { name: '1 Year', value: '1y' }
                )
        ),

    async execute(interaction) {
        try {
            // Defer reply immediately to avoid interaction timeout
            if (!interaction.deferred && !interaction.replied) {
                await interaction.deferReply({ ephemeral: true });
            }

            const duration = interaction.options.getString('duration');
            const code = generateRandomCode();
            const expiration = new Date(Date.now() + ms(duration));

            // Save the premium code to the database
            await PremiumCode.create({ code, duration, expiration });

            // Edit the deferred reply with the result
            await interaction.editReply({
                content: `🎉 Premium code generated: \`${code}\`\nDuration: **${duration}**\nExpires on: **${expiration.toUTCString()}**`
            });
        } catch (error) {
            console.error(`[ERROR] Failed to generate premium code:`, error);

            // Ensure the interaction is acknowledged with an error response
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({
                    content: '❌ An error occurred while generating the premium code. Please try again later.'
                });
            } else {
                await interaction.reply({
                    content: '❌ An error occurred while generating the premium code. Please try again later.',
                    ephemeral: true
                });
            }
        }
    }
};
