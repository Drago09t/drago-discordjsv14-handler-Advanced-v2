const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { error } = require('../config/colors.json');
const { error: errorEmoji } = require('../config/emojis.json');

module.exports = async (client, error, channel) => {
    const embed = new EmbedBuilder()
        .setTitle(`${errorEmoji} An Error Occurred`)
        .setDescription(`\`\`\`${error.message}\`\`\``)
        .setColor(error);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel('Report Issue')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('report_issue')
    );

    await channel.send({ embeds: [embed], components: [row] });
};
