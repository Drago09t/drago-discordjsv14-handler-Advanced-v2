const { EmbedBuilder } = require('discord.js');
const { info } = require('../config/colors.json');

module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'report_issue') {
            const embed = new EmbedBuilder()
                .setTitle('Report Submitted')
                .setDescription('Your issue has been reported to the development team.')
                .setColor(info);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    });
};
