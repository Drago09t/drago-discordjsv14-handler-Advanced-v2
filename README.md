# Advanced Discord Bot

An advanced Discord bot built with `discord.js` v14, integrated with MongoDB using `mongoose`. This bot supports both prefix and slash commands, features button and menu interactions, and includes robust logging for commands, guild joins, and leaves. It also offers a premium system, maintenance mode, and detailed startup statistics.
# Changelog

### v2.0.0

### Added Premium Code System:

Users and servers can redeem premium codes.

Admins can generate time-limited or lifetime premium codes.

Premium status commands to check user or server access.


### Top.gg Vote Integration:

Added vote-check commands that require users to vote on top.gg.

Detailed vote logs sent to a specified log channel with embeds.

## Cooldown system 

Added Cooldown user can set Cooldown in commands now

### Enhanced Error Handling:

All responses now use embeds with emojis.

Improved error tracking with support for button interactions (e.g., report issue or join support server).

## Model Handler 

Added the model Handler 

### Button and Menu Handlers:

Added example handlers for button and select menu interactions.

Users can create and use their own buttons and menus dynamically.


### Dynamic Startup Stats:

Console displays the total count of commands, buttons, and events loaded at runtime.


### Logging System Overhaul:

Logs for premium actions and vote tracking.

Command logs include user, command, and guild information.
 
## will upload soon on GitHub after 7-8 hour's 

### also you can give me suggestions
## Features

- **Command Handling**: Supports both prefix and slash commands.
- **Button & Select Menu Interactions**: Handles button clicks and select menus dynamically.
- **Guild Logging**: Tracks when the bot joins or leaves servers.
- **Command Logging**: Records command usage for better tracking.
- **Premium System**: Manage premium status for users and servers.
- **Maintenance Mode**: Easily toggle maintenance mode to prevent interactions during updates.
- **Dynamic Stats**: Displays loaded commands, buttons, menus, and event counts during startup.
- **Error Logging**: Captures errors for better debugging.

## Prerequisites

- [Node.js v18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) for database
- Discord Bot Token (get one from the [Discord Developer Portal](https://discord.com/developers/applications))
- Optional: A webhook URL for logging if you want to receive logs in a Discord channel

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Drago09t/drago-discordjsv14-handler-Advanced-v2.git
    cd advanced-discord-bot
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Create `.env` File**:

   Create a `.env` file in the root directory and add your configuration:

    ```env
DISCORD_TOKEN=
GUILD_LOG_CHANNEL=
COMMAND_LOG_CHANNEL=
ERROR_LOG_CHANNEL=
VOTE_LOG_CHANNEL=
TOPGG_WEBHOOK_AUTH=
PORT=
CLIENT_ID=
MAINTENANCE_MODE=
OWNER_ID=
PREMIUM_LOG_CHANNEL=
    ```

4. **Update `config.json`**:

   Update the `config.json` file to adjust your bot settings:

    ```json
    {
      "prefix": "!",
      "maintenance": false
    }
    ```
    

5. **Run the Bot**:

    ```bash
    npm start
    ```

   The bot will now connect to Discord and MongoDB, and will log stats about loaded commands, events, and interactions.

## File Structure


## Usage

### Basic Commands

- **/ping**: Check the bot's response time.
- **/help**: Displays a list of available commands.
- **/maintenance**: Toggle maintenance mode (Admin only).
- **/premium**: Manage premium status for a user (Admin only).
- **!ping**: Responds with "Pong!" (Prefix command example).

### Logging Commands

Logs are recorded in the `logs/` folder:

- **commands.log**: Records every command used, including the user, command, and server.
- **guilds.log**: Records when the bot joins or leaves a server, with details.

### Adding New Commands

1. **Slash Command**: Create a new file in `commands/general/`:

    ```js
    const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
      data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('An example command.'),
      async execute(interaction) {
        await interaction.reply('This is an example command!');
      },
    };
    ```

2. **Prefix Command**: Create a new file in `commands/general/`:

    ```js
    module.exports = {
      name: 'example',
      description: 'An example prefix command.',
      async execute(message, args) {
        message.channel.send('This is an example prefix command!');
      },
    };
    ```

3. **Restart the Bot**:

   Restart the bot for the new command to be loaded:

    ```bash
    npm start
    ```

### Adding Buttons and Menus

1. **Button Interaction**: Create a file in `interactions/buttons/`:

    ```js
    module.exports = {
      data: {
        id: 'example_button',
      },
      async execute(interaction) {
        await interaction.reply('Button clicked!');
      },
    };
    ```

2. **Select Menu Interaction**: Create a file in `interactions/menus/`:

    ```js
    module.exports = {
      data: {
        id: 'example_menu',
      },
      async execute(interaction) {
        const selectedValue = interaction.values[0];
        await interaction.reply(`You selected: ${selectedValue}`);
      },
    };
    ```

3. **Use the Button or Menu** in a command as shown in `testButton.js` and `testMenu.js`.

## Troubleshooting

- **MongoDB Connection Error**: Make sure your `MONGO_URI` in the `.env` file is correct and that MongoDB is running.
- **Bot Not Responding**: Ensure the `TOKEN` in `.env` is correct. Check for errors in the console.
- **Command Not Found**: Ensure the command file is in the right directory and has the correct export structure.

## Contributing

Feel free to fork this repository and make your improvements. Submit a pull request if you think something can be improved or added.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For help and support, you can reach out through the following:

- **Discord Server**: [Invite Link](https://discord.gg/RCNWYTaatv)
- **Issues**: Report bugs or request features in the [GitHub Issues](https://github.com/Drago09t/drago-discordjsv14-handler-Advanced-v2/issues) section.

## FIles Stucture
```advanced-discord-bot/
advanced-discord-bot/
│
├── .env                          # Environment variables
├── package.json                  # Node.js dependencies and scripts
├── index.js                      # Main bot file
├── deploy-commands.js            # Command deployment script
├── README.md                     # Project documentation
│
├── commands/                     # Commands folder
│   ├── prefix/                   # Prefix commands
│   │   └── hello.js              # Example prefix command
│   └── slash/                    # Slash commands
│       ├── addpremium.js         # Add premium access command
│       ├── checkpremium.js       # Check premium status command
│       └── generatepremiumcode.js # Generate premium code command
│
├── config/                       # Configurations
│   ├── colors.json               # Embed colors configuration
│   └── emojis.json               # Emojis configuration
│
├── events/                       # Event handlers
│   ├── interactionCreate.js      # Handles interactions (slash commands)
│   └── messageCreate.js          # Handles prefix commands
│
├── handlers/                     # Command and event handlers
│   ├── buttonHandler.js          # Handles button interactions
│   ├── commandHandler.js         # Handles commands (prefix & slash)
│   ├── eventHandler.js           # Handles event registration
│   ├── menuHandler.js            # Handles menu interactions
│   ├── voteHandler.js            # Handles Top.gg vote events
│   └── premiumLogger.js          # Logs premium code generation
│
├── middlewares/                  # Middleware functions
│   ├── cooldown.js               # Cooldown system middleware
│   ├── maintenance.js            # Maintenance mode middleware
│   ├── ownerCheck.js             # Owner-only commands check
│   ├── premiumCheck.js           # Premium user/guild check
│   └── creditValidator.js        # Validates bot credits for authenticity
│
├── models/                       # Mongoose models
│   ├── premiumCode.js            # Premium code schema
│   ├── premiumGuild.js           # Premium guild schema
│   ├── premiumUser.js            # Premium user schema
│   └── vote.js                   # Top.gg vote tracking schema
│
├── utils/                        # Utility functions
│   ├── generateCode.js           # Generates premium codes
│   ├── logPremiumCode.js         # Logs premium code generation to channel
│   └── toggleMaintenance.js      # Toggles maintenance mode
│
└── node_modules/                 # Node.js dependencies
```
