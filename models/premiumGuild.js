const { Schema, model } = require('mongoose');

const premiumGuildSchema = new Schema({
    guildId: String,
    expiration: Date
});

module.exports = model('PremiumGuild', premiumGuildSchema);
