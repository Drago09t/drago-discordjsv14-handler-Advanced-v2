const colors = require('../config/colors.json'); // Load colors from config

module.exports = async (client, guild) => {
    const logChannel = client.channels.cache.get(process.env.GUILD_LOG_CHANNEL);

    if (logChannel) {
        const yellowColor = parseInt(colors.yellow.replace('#', ''), 16); // Convert hex to integer

        logChannel.send({
            embeds: [{
                title: 'Guild Left',
                description: `Bot removed from **${guild.name}**.`,
                color: yellowColor // Use integer color value
            }]
        }).catch(console.error); // Catch any errors
    } else {
        console.error('[ERROR] Guild log channel not found.');
    }
};
