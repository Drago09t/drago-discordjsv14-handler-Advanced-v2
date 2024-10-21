const { Schema, model } = require('mongoose');

const guildConfigSchema = new Schema({
    guildId: String,
    prefix: { type: String, default: '!' },
    premium: { type: Boolean, default: false }
});

module.exports = model('GuildConfig', guildConfigSchema);
