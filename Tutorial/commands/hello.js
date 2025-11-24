
// Step 1: Import fs module for file operations
const fs = require('fs');

// Step 2: Export the command handler function
module.exports = async (message, users, usersFile) => {

    // Step 3  : Get the user's unique Discord ID (snowflake)
    const userId = message.author.id;

    // Step 4: Get the user's current username to personalize messages
    const username = message.author.username;

    // Step 5  : Check if user already exists in database
    if (users[userId]) {

        // Step 5.1: User has greeted before/Is already authenticated
        if (users[userId].authenticated) {
            await message.reply(`Welcome back, ${username}! You are already authenticated.`);
            return; // Exit early - user already authenticated
        } else {
            // Step 5.2 User exits but hasn't authenticated (Should not happen but handle it just in case)
            users[userId].authenticated = true;
            users[userId].username = username;

            //  Save updated data to users.json
            try {
                fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
                await message.reply(`Hello, ${username}! You have been authenticated successfully.`);
                return; // Exit after successful authentication
            } catch (error) {
                console.error('Error writing to users file:', error);
                await message.reply('There was an error authenticating you. Please try again later.');
                return; // Exit after error
            }
        }
    }
    else {
        // Step 6: New user - Create profile and authenticate
        users[userId] = {
            userId: userId,
            username: username,
            authenticated: true,
            games: {
                rps: {
                    wins: 0,
                    losses: 0,
                    ties: 0
                }
                // Add additional game features
            }
        }
    };

    //  Step 7: Save the new user to users.json
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        //  Step 8: Send welcome message with instructions
        await message.reply(
            `Hello, ${username}! You have been authenticated to AubacityBot. Accessible commands:\n` +
            `!time [UTC|Type] - Get current time info\n` +
            `!joke - Get a random programming joke\n` +
            `!rps [rock|paper|scissors] - Play Rock-Paper-Scissors game\n` +
            `!score - View your game stats\n` +
            `!weather [location] - Get current weather info, use commas to specify more strictly`
        );
    } catch (error) {
        // Step 9: Error Handle if file write fails
        console.error('Error writing to users file:', error);
        await message.reply('There was an error authenticating you. Please try again later.');
    }
};