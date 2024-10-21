module.exports = async (client, command, user) => {
    const logChannel = client.channels.cache.get(process.env.COMMAND_LOG_CHANNEL);

    if (logChannel) {
        logChannel.send({
            embeds: [{
                title: 'Command Usage Logged',
                description: `User **${user.tag}** used command **${command.name}**.`,
                color: 'BLUE'
            }]
        });
    }
};
