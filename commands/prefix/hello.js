const colors = require('../../config/colors.json'); // Adjust path correctly

module.exports = {
    name: 'hello',
    description: 'Say hello!',
    execute(message) {
        const blueColor = parseInt(colors.blue.replace('#', ''), 16); // Convert hex to integer

        message.channel.send({
            embeds: [{
                description: 'Hello there!',
                color: blueColor // Use integer color value
            }]
        }).catch(console.error); // Catch and log any errors
    }
};
