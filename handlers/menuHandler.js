module.exports = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isSelectMenu()) return;

        const selection = interaction.values[0];
        await interaction.reply({ content: `You selected: **${selection}**.`, ephemeral: true });
    });
};
