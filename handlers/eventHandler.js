const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    let eventCount = 0;

    const eventFiles = fs.readdirSync(path.join(__dirname, '../events')).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];

        client.on(eventName, (...args) => event(client, ...args));
        console.log(`[EVENT] Loaded: ${eventName}`);
        eventCount++;
    }

    console.log(`[INFO] Total Events Loaded: ${eventCount}`);
    console.log(`---------------------------------------------- `);

};
