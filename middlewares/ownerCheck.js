const dotenv = require('dotenv');
dotenv.config();

module.exports = (interaction) => {
    const ownerId = process.env.OWNER_ID;
    return interaction.user.id === ownerId;
};
