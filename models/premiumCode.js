const { Schema, model } = require('mongoose');

const premiumCodeSchema = new Schema({
    code: String,
    duration: String, // E.g., "1 day", "1 week"
    expiration: Date,
    redeemedBy: { type: String, default: null } // User ID of the redeemer, if any
});

module.exports = model('PremiumCode', premiumCodeSchema);
