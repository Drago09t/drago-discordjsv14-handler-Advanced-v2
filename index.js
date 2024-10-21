const { Client, GatewayIntentBits, Partials } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Validate Credits Before Starting the Bot


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

// Load Handlers
require('./handlers/commandHandler')(client);
require('./handlers/eventHandler')(client);
require('./handlers/buttonHandler')(client);
require('./handlers/menuHandler')(client);
require('./handlers/voteHandler')(client);

// Mongoose Database Connection (without deprecated options)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('[DATABASE] Connected to MongoDB'))
    .catch(err => console.error('[DATABASE] Connection Error:', err));

// Bot Ready Event (Combined with Activity Setup)
client.on('ready', () => {
    console.log(`[INFO] Logged in as ${client.user.tag}`);

    // Set static activity
    client.user.setActivity('with Discord.js', { type: 'PLAYING' });

    console.log('[ACTIVITY] Bot activity set to: Playing with Discord.js');
});
// Load premium logging event
const logPremiumCode = require('./events/premiumLogs.js');
client.on('premiumCodeGenerated', (code, duration) => logPremiumCode(client, code, duration));

//admin system

// Login to Discord
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log('[BOT] Bot is online!'))
    .catch(err => console.error('[BOT] Login Error:', err));
