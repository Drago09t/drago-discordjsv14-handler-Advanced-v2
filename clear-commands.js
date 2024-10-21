const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('[INFO] Fetching global commands...');

        const data = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
        const promises = data.map((command) =>
            rest.delete(`${Routes.applicationCommands(process.env.CLIENT_ID)}/${command.id}`)
        );

        await Promise.all(promises);
        console.log('[INFO] Successfully deleted all global commands.');
    } catch (error) {
        console.error(`[ERROR] Failed to delete global commands:`, error);
    }
})();
