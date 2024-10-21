const dotenv = require('dotenv');
dotenv.config();

module.exports = (interactionOrMessage) => {
    const isMaintenance = process.env.MAINTENANCE_MODE === 'true';
    const isOwner = interactionOrMessage.author?.id === process.env.OWNER_ID;

    // If maintenance is on and the user is not the owner, block command usage
    if (isMaintenance && !isOwner) {
        return true; // Maintenance active, block command
    }
    return false; // No maintenance, allow command
};
