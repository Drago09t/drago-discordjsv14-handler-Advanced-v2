module.exports = async (client, error) => {
    const logChannel = client.channels.cache.get(process.env.ERROR_LOG_CHANNEL);
    if (logChannel) {
        logChannel.send({
            embeds: [{
                title: 'Error Logged',
                description: `\`\`\`${error.message}\`\`\``,
                color: 0xbe0707
            }]
        });
    }
};
