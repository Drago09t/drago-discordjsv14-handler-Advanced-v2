const PremiumUser = require('../models/premiumUser');
const { EmbedBuilder } = require('discord.js');
const { info } = require('../config/colors.json');

module.exports = {
    generatePremiumCode(length) {
        return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
    },

    async addPremium(userId, days) {
        const expiration = new Date(Date.now() + days * 86400000);
        await PremiumUser.create({ userId, expiration });

        const embed = new EmbedBuilder()
            .setTitle('Premium Granted')
            .setDescription(`User with ID **${userId}** now has premium access for ${days} days.`)
            .setColor(info);

        const logChannel = client.channels.cache.get(process.env.PREMIUM_LOG_CHANNEL);
        if (logChannel) logChannel.send({ embeds: [embed] });
    },

    async isPremium(userId) {
        const user = await PremiumUser.findOne({ userId });
        return user && user.expiration > new Date();
    }
};
