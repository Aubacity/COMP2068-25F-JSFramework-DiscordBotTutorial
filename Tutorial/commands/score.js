
// Step 1: Export command handler function
module.exports = async (message, users) => {

    // Step 2: Get user's Discord ID (snowflake)
    const userID = message.author.id;

    //  Step 3: Check if user exists in the database
    if (!users[userID]) {
        await message.reply('No stats found. Please use `!hello` first to authenticate.');
        return;
    }

    // Step 4: Get user's data from the users object
    const userData = users[userID];
    const username = userData.username || message.author.username;

    // Step 5: Check if user has any game statistics
    if (!userData.games || Object.keys(userData.games).length === 0) {
        // User has authenticated but has no game stats
        await message.reply(`**${username}'s Game Statistics:**\n You haven't played any games yet!`);
        return;
    }

    // Step 6: Build the statistics message
    let statsMessage = `**${username}'s Game Statistics:**\n`;

    // Step 7: Loop for each category and display

    // RPS stats
    if (userData.games.rps) {
        const rpsStats = userData.games.rps;
        const wins = rpsStats.wins || 0;
        const losses = rpsStats.losses || 0;
        const ties = rpsStats.ties || 0;
        const totalGames = wins + losses + ties;

        // Calculate win rate
        let winRate = 0;
        if (totalGames > 0) {
            winRate = ((wins / totalGames) * 100).toFixed(1);
        }

        // Add RPS stats to message
        statsMessage += `\n**Rock-Paper-Scissors:**\n` +
            `- Total Games: ${totalGames}\n` +
            `- Wins: ${wins}\n` +
            `- Losses: ${losses}\n` +
            `- Ties: ${ties}\n` +
            `- Win Rate: ${winRate}%\n`;
    }

    // Step 8: Future games stats -here-
    // if (userData.games.trivia) { ... }

    // Step 9: Send the statistics message
    await message.reply(statsMessage);
};