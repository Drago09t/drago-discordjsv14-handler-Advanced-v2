const crypto = require('crypto');

const message = 'Created by Typedrago';
const hash = crypto.createHash('sha256').update(message).digest('hex');

console.log(`Credit Hash: ${hash}`);
