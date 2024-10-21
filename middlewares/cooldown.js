const cooldowns = new Map();

/**
 * Middleware to manage command cooldowns.
 * @param {string} commandName - The name of the command.
 * @param {string} userId - The ID of the user executing the command.
 * @param {number} cooldownSeconds - Cooldown duration in seconds.
 * @returns {boolean|number} - Returns `false` if no cooldown, or the remaining time.
 */
module.exports = (commandName, userId, cooldownSeconds) => {
    const now = Date.now();
    if (!cooldowns.has(commandName)) cooldowns.set(commandName, new Map());

    const timestamps = cooldowns.get(commandName);
    const cooldownAmount = cooldownSeconds * 1000;

    if (timestamps.has(userId)) {
        const expirationTime = timestamps.get(userId) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
            return timeLeft; // Return remaining time
        }
    }

    // Set the new timestamp
    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);

    return false; // No cooldown
};
