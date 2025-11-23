// Discord bot - Main file

// Step 1: Import required modules
// discord.js - Discord library (v14)
const { Client, GatewayIntentBits } = require('discord.js');
// dotenv - Load environment variables
require('dotenv').config();
// File system module
const fs = require('fs');
// Path module
const path = require('path');

// Step 2: Import all command handlers
const handleHello = require('./commands/hello');
const handleHelp = require('./commands/help');
const handleTime = require('./commands/time');
const handleJoke = require('./commands/joke');
const handleRps = require('./commands/rps');
const handleScore = require('./commands/score');
const handleWeather = require('./commands/weather');

// Step 3: Create a new Discord client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Step 4: Initialize data directory and users.json file
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Create users.json with empty object if it doesn't exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify({}, null, 2));
}

//  Step 5: Event handler - Bot is hot and ready
client.on('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
    console.log(`Serving ${client.guilds.cache.size} server(s)`);
    console.log(`Type !hello in your server to get started.`);
});

// Step 6: Event handler - message received
client.on('messageCreate', async (message) => {
    // Step 6.1: Ignore messages from other bots (revert if needed)
    if (message.author.bot) return;

    // Step 6.2: Dedicated channel
    const ALLOWED_CHANNEL = '558077225304457244';
    if (message.channel.id !== ALLOWED_CHANNEL) return;

    // Step 6.3: Parse message content to lowercase
    const content = message.content.toLowerCase();

    // Step 6.4: Check if message starts with command prefix '!'
    if (!content.startsWith('!')) return;

    //  Step 6.5: Split message into command and args (if args)
    const args = message.content.split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);

    //  Step 6.6: Load user data from users.json
    let users = {};
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        console.error('Error reading users.json', error);
        users = {};
    }
    
    // Step 6.7: Get users' Discord ID (snowflake)
    const userId = message.author.id;

    // Step 6.8 Route commands to their respective handlers

    // !hello command - Authentication (is always allowed)
    if (command === '!hello') {
        await handleHello(message, users, usersFile);
        return;
    }

    // Step 6.9: Authentication check for all other commands
    if (!users[userId] || !users[userId].authenticated) {
        // user is not authenticated, ignore their commands silently
        await message.reply('You have not greeted me yet! Please use `!hello` to authenticate first.');
        return;
    }

    // Step 6.10: Command routing the authorized users
    if (command === '!help') {
        await handleHelp(message);
        return;
    }

    if (command === '!time') {
        await handleTime(message, commandArgs);
        return;
    }

    if (command === '!joke') {
        await handleJoke(message);
        return;
    }

    if (command === '!rps') {
        await handleRps(message, commandArgs, users, usersFile);
        return;
    }

    if (command === '!score') {
        await handleScore(message, users);
        return;
    }

    if (command === '!weather') {
        await handleWeather(message, commandArgs);
        return;
    }

    // Step 6.11: If command doesn't match any known, ignore it silently

});

// Step 7: Error handle for the Discord client
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

// Step 8: Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Step 9: Login to Discord using the bot token
client.login(process.env.DISCORD_TOKEN);