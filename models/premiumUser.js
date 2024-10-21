const { Schema, model } = require('mongoose');

const premiumUserSchema = new Schema({
    userId: String,
    expiration: Date
});

module.exports = model('PremiumUser', premiumUserSchema);
