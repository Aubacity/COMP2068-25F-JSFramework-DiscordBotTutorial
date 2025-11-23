
// Step 1: Export command handler function
module.exports = async (message) => {

    // Step 2: Build help message with all available commands
    const helpMessage = 
        `**AubacityBot - Available Commands:**\n\n` +
        `**!hello** - Authenticate with the bot and create your profile\n` +
        `**!help** - Display this help message with all commands\n` +
        `**!time [UTC_offset] [format]** - Get current time with timezone offset and format options\n` +
        `**!joke** - Fetch a random programming joke\n` +
        `**!rps [rock|paper|scissors]** - Play Rock-Paper-Scissors against the bot\n` +
        `**!score** - View your game statistics and win rates\n` +
        `**!weather [location]** - Get current weather for any location\n\n` +
        `**Command Details:**\n` +
        `- Arguments can be swapped [UTC Type] or [Type UTC]\n` +
        `- Use commas in weather locations for more precise results (e.g., Toronto, Ontario, Canada)\n` +
        `- Time format options: t, T, d, D, f, F, R\n` +
        `- RPS accepts shorthand: r, p, s\n`;

    // Step 3: Send help message to the channel
    await message.reply(helpMessage);
};
