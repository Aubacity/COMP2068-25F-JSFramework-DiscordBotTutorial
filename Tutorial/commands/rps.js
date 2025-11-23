
// Step 1: Import fs module for file operations
const fs = require('fs');

// Step 2: Export command handler function
module.exports = async (message, args, users, usersFile) => {

    // Step 3: validate the user provided a choice argument
    if (args.length === 0) {
        await message.reply(`Please provide your choice [rock|paper|scissors]`);
        return;
    }

    // Step 4: Get user's choice and normalize it
    const userInput = args[0].toLowerCase();

    // Step 5: Map user input
    let userChoice = '';
    if (userInput === 'rock' || userInput === 'r') {
        userChoice = 'rock';
    } else if (userInput === 'paper' || userInput === 'p') {
        userChoice = 'paper';
    } else if (userInput === 'scissors' || userInput === 's') {
        userChoice = 'scissors';
    } else {
        // Step 5.1: Invalid input
        await message.reply(`Invalid choice. Available: [rock|paper|scissors] OR [r|p|s]`);
        return;
    }

    // Step 6: Bot random selection of choices
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const botChoice = choices[randomIndex];

    // Step 7: Determine whom won
    // Rock < Paper < Scissors < Rock

    let result = '';
    let outcome = '';

    if (userChoice === botChoice) {
        result = 'It\'s a tie!';
        outcome = 'ties';
    } else if (
        (userChoice === 'rock' && botChoice === 'scissors') ||
        (userChoice === 'paper' && botChoice === 'rock') ||
        (userChoice === 'scissors' && botChoice === 'paper')
    ) {
        result = 'You win!';
        outcome = 'wins';
    } else {
        result = 'You lose!';
        outcome = 'loss';
    }

    // Step 8: Update user's statistics
    const userId = message.author.id;

    // Initialize RPS stats if they don't exist
    if (!users[userId].games) {
        users[userId].games = {};
    }
    if (!users[userId].games.rps) {
        users[userId].games.rps = {
            wins: 0,
            losses: 0,
            ties: 0
        };
    }

    // Step 9: Increment appropriate statistic
    if (outcome === 'wins') {
        users[userId].games.rps.wins++;
    } else if (outcome === 'loss') {
        users[userId].games.rps.losses++;
    } else {
        users[userId].games.rps.ties++;
    }

    // Step 10: Save updated stats to users.json
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to users file:', error);
        await message.reply('There was an error updating your game stats. Please try again later.');
        return;
    }

    // Step 11: Send game result to Discord channel
    await message.reply(
        `**Rock Paper Scissors!**\n` +
        `Your choice: **${userChoice}** against my choice: **${botChoice}**\n` +
        `**${result}**`
    )
}