const PremiumUser = require('../../models/premiumUser');
const PremiumGuild = require('../../models/premiumGuild');
const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addpremium')
        .setDescription('Grant premium access to a user or guild.')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('User or Guild')
                .setRequired(true)
                .addChoices(
                    { name: 'User', value: 'user' },
                    { name: 'Guild', value: 'guild' }
                ))
        .addStringOption(option =>
            option.setName('id')
                .setDescription('The ID of the user or guild.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('duration')
                .setDescription('Duration of premium access (e.g., 1d, 1m).')
                .setRequired(true)),

    async execute(interaction) {
        const type = interaction.options.getString('type');
        const id = interaction.options.getString('id');
        const duration = interaction.options.getString('duration');
        const expiration = new Date(Date.now() + ms(duration));

        if (type === 'user') {
            await PremiumUser.create({ userId: id, expiration });
            return interaction.reply(`🎉 Premium access granted to user with ID **${id}** until **${expiration.toUTCString()}**.`);
        } else if (type === 'guild') {
            await PremiumGuild.create({ guildId: id, expiration });
            return interaction.reply(`🎉 Premium access granted to guild with ID **${id}** until **${expiration.toUTCString()}**.`);
        }
    }
};
