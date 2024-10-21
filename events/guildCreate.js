const { EmbedBuilder } = require('discord.js');
const colors = require('../config/colors.json'); // Load colors from config

module.exports = async (client, guild) => {
    const logChannelId = process.env.GUILD_LOG_CHANNEL;

    // Fetch the log channel
    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);

    if (!logChannel) {
        console.error('[ERROR] Log channel not found or bot lacks access to it.');
        return;
    }

    // Convert hex color to integer for Discord API
    const successColor = parseInt(colors.success.replace("#", ""), 16);

    const embed = new EmbedBuilder()
        .setTitle('New Guild Joined')
        .setDescription(`Bot added to **${guild.name}** with **${guild.memberCount}** members.`)
        .setColor(successColor) // Use integer color value
        .setTimestamp();

    // Send the embed message to the log channel
    logChannel.send({ embeds: [embed] }).catch(console.error);
    console.log(`[INFO] Joined new guild: ${guild.name}`);
};
