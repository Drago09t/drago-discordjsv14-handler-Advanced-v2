const PremiumUser = require('../../models/premiumUser');
const PremiumGuild = require('../../models/premiumGuild');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removepremium')
        .setDescription('Remove premium status from a user or guild.')
        .addStringOption(option =>
            option.setName('type')
            .setDescription('Specify whether it is for a user or a guild.')
            .setRequired(true)
            .addChoices(
                { name: 'User', value: 'user' },
                { name: 'Guild', value: 'guild' }
            ))
        .addStringOption(option =>
            option.setName('id')
            .setDescription('The ID of the user or guild.')
            .setRequired(true)),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const id = interaction.options.getString('id');

        if (type === 'user') {
            await PremiumUser.findOneAndDelete({ userId: id });
            return interaction.reply(`Premium removed from user with ID ${id}.`);
        } else if (type === 'guild') {
            await PremiumGuild.findOneAndDelete({ guildId: id });
            return interaction.reply(`Premium removed from guild with ID ${id}.`);
        }
    }
};
