module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Loaded ${client.commands.size} commands.`);
};
