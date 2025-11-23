
// Step 1: Import node-fetch for HTTP requests
const fetch = require('node-fetch');

// https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit
// Step 2: Define the JokeAPI endpoint URL
// Only use "Programming" category
// Blacklist inappropriate content
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit';

// Step 3: Export the command handler function
module.exports = async (message) => {
    try {
        // Step 4: Send a "typing" indicator while fetching the joke (simulates real-time typing)
        message.channel.sendTyping();

        // Step 5: Make HTTP GET request to JokeAPI
        const response = await fetch(JOKE_API_URL);

        // Step 6: Check if the API request was successful
        if (!response.ok) {
            throw new Error(`JokeAPI return status ${response.status}`);
        }

        // Step 7: Parse the JSON response
        const data = await response.json();

        // Step 8: Check if the API returned an error in the JSON
        if (data.error) {
            throw new Error('JokeAPI returned an error in the response');
        }

        // Step 9: Determine joke type and extract content
        let jokeText = '';

        if (data.type === 'single') {
            // Step 9.1: Single-part joke
            jokeText = data.joke;
        } else if (data.type === 'twopart') {
            // Step 9.2: Two-part joke (setup + delivery)
            jokeText = `${data.setup}\n\n${data.delivery}`;
        } else {
            // Step 9.3: Unknown joke type
            throw new Error('Unknown joke type from JokeAPI');
        }

        // Step 10: Send joke to Discord channel
        await message.reply(`**Programming Joke:**\n${jokeText}`);

    } catch (error) {
        // Step 11: Error handling
        console.error('Error fetching joke:', error);
        await message.reply('Sorry, could not fetch a joke at this time. Please try again later.');
    }
}