const Topgg = require('@top-gg/sdk'); // Import Top.gg SDK
const { EmbedBuilder } = require('discord.js');
const { success } = require('../config/colors.json');

module.exports = (client) => {
    const webhook = new Topgg.Webhook(process.env.TOPGG_WEBHOOK_AUTH); // Webhook auth from .env

    client.on('topggVote', async (vote) => {
        const { user } = vote;

        const embed = new EmbedBuilder()
            .setTitle('Thank You for Voting!')
            .setDescription(`User <@${user}> voted for the bot! 🎉`)
            .setColor(success);

        const logChannel = client.channels.cache.get(process.env.VOTE_LOG_CHANNEL);
        if (logChannel) {
            await logChannel.send({ embeds: [embed] });
        }
    });

    console.log('Top.gg webhook listener attached.');
};
