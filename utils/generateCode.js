function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const getRandom = (length) => Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');

    return `${getRandom(4)}-${getRandom(5)}-${getRandom(5)}`; // Format: ABCD-ABCDE-ABCDE
}

module.exports = generateRandomCode;
