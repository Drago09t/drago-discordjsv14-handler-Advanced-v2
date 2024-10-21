const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const{SlashCommandBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('togglemaintenance')
    .setDescription('Toggle maintenance mode (Owner only)'),

    async execute(interaction) {
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const currentState = process.env.MAINTENANCE_MODE === 'true';
        const newState = !currentState;

        const envContent = fs.readFileSync('.env', 'utf-8').split('\n').map(line => {
            if (line.startsWith('MAINTENANCE_MODE')) {
                return `MAINTENANCE_MODE=${newState}`;
            }
            return line;
        }).join('\n');

        fs.writeFileSync('.env', envContent);

        await interaction.reply({
            content: `Maintenance mode is now **${newState ? 'ON' : 'OFF'}**.`,
            ephemeral: true
        });

        console.log(`[INFO] Maintenance mode set to: ${newState}`);
    }
};
