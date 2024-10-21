const crypto = require('crypto');

// Original credit message and its hash
const creditMessage = 'Created by Typedrago';
const originalHash = '5d4b2491799be99d70c155943105cfc66aa0670c6c32f0b9c702c561ba1e8847'; // Use your generated hash

/**
 * Validates the credit message.
 * If the credit is modified or removed, the bot won't start.
 */
function basehandler() {
    const currentHash = crypto.createHash('sha256').update(creditMessage).digest('hex');

    if (currentHash !== originalHash) {
        console.error('[ERROR] Credit validation failed! Bot cannot run without proper credits.');
        process.exit(1); // Exit the process if the credit is invalid
    }
    console.log(`---------------------------------------------- `);

    console.log('[CREDIT] Bot validated: Created by Typedrago');

    console.log(`---------------------------------------------- `);

}

module.exports = basehandler;