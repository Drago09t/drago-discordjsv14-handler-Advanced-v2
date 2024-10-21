const PremiumUser = require('../models/premiumUser');
const PremiumGuild = require('../models/premiumGuild');

module.exports = async (interaction) => {
    const { guild, user } = interaction;

    if (guild) {
        const guildPremium = await PremiumGuild.findOne({ guildId: guild.id });
        if (guildPremium && guildPremium.expiration > new Date()) return true;
    }

    const userPremium = await PremiumUser.findOne({ userId: user.id });
    if (userPremium && userPremium.expiration > new Date()) return true;

    return false;
};
