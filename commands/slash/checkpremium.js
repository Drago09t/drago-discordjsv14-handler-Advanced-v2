const PremiumUser = require('../../models/premiumUser');
const PremiumGuild = require('../../models/premiumGuild');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkpremium')
        .setDescription('Check the premium status of a user or guild.')
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
        let premiumEntry, entityType;

        if (type === 'user') {
            premiumEntry = await PremiumUser.findOne({ userId: id });
            entityType = 'User';
        } else if (type === 'guild') {
            premiumEntry = await PremiumGuild.findOne({ guildId: id });
            entityType = 'Guild';
        }

        if (!premiumEntry) {
            return interaction.reply({
                content: `${entityType} with ID **${id}** does not have premium.`,
                ephemeral: true
            });
        }

        const expirationDate = `<t:${Math.floor(new Date(premiumEntry.expiration).getTime() / 1000)}:F>`;

        const embed = new EmbedBuilder()
            .setTitle(`✨ Premium Status: ${entityType}`)
            .setDescription(`${entityType} with ID **${id}** has premium.`)
            .addFields(
                { name: 'Expiration', value: expirationDate, inline: true }
            )
            .setColor('#FFD700') // Gold color for premium
            .setFooter({ text: 'Premium System' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
