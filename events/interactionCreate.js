const cooldown = require('../middlewares/cooldown'); // Import the cooldown middleware
const { EmbedBuilder } = require('discord.js');
const { error, warning } = require('../config/colors.json');

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        const embed = new EmbedBuilder()
            .setDescription(`Command \`${interaction.commandName}\` not found!`)
            .setColor(error);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // Check for cooldowns
    const timeLeft = cooldown(interaction.commandName, interaction.user.id, command.cooldown || 3); // Default 3s cooldown
    if (timeLeft) {
        const embed = new EmbedBuilder()
            .setDescription(`Please wait **${timeLeft} seconds** before using \`${interaction.commandName}\` again.`)
            .setColor(warning);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);

        const errorEmbed = new EmbedBuilder()
            .setDescription('An error occurred while executing this command.')
            .setColor(error);

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
};
