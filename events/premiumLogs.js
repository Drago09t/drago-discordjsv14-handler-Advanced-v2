const { EmbedBuilder } = require('discord.js');

module.exports = async (client, code, duration) => {
    try {
        const logChannel = client.channels.cache.get(process.env.PREMIUM_LOG_CHANNEL);

        if (!logChannel) {
            console.error('[ERROR] Premium log channel not found or not configured.');
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('🎉 New Premium Code Generated')
            .setDescription('A new premium code has been successfully generated.')
            .addFields(
                { name: 'Code', value: `\`${code}\``, inline: false },
                { name: 'Duration', value: `**${duration}**`, inline: true },
                { name: 'Generated At', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
            )
            .setColor('#FFD700') // Gold color for premium codes
            .setFooter({ text: 'Premium System Logs' })
            .setTimestamp();

        // Send the embed to the log channel
        await logChannel.send({ embeds: [embed] });
        console.log(`[INFO] Logged premium code: ${code}`);
    } catch (error) {
        console.error(`[ERROR] Failed to send log message: ${error.message}`);
    }
};
