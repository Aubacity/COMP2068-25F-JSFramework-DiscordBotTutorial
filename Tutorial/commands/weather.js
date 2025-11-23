
// Step 1: Import node-fetch for HTTP requests
const fetch = require('node-fetch');

// Step 2: Export command handler function
module.exports = async (message, args) => {

    // Step 3: Validate that user provided a location argument
    if (args.length === 0) {
        await message.reply('Please provide a location. Example: !weather Toronto, Ontario, Canada');
        return;
    }

    //  Step 4: Join all arguments to form the location query
    const location = args.join(' ');

    try {
        // Step 5: Send a "typing" indicator while fetching weather data
        await message.channel.sendTypeing();

        // Step 6: Get WeatherAPI key from environment variable
        const apiKey = process.env.WEATHER_API_KEY;

        // Step 6.1: Check if API key even exists
        if (!apiKey) {
            throw new Error('Weather API key is not set in .env variables.');
        }

        // Step 7: Build the API request URL
        // WeatherAPI endpoint: http://api.weatherapi.com/v1/current.json
        //  Params: key, q (location, commas for more exact), aqi Air quality data (no = don't include)
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;

        // Step 8: Make HTTP GET request to WeatherAPI
        const response = await fetch(apiUrl);

        // Step 9: If successful response
        if (!response.ok) {
            // Step 9.1: Handle specific error codes
            if (response.status === 400) {
                // Bad request - likely invalid location
                await message.reply('Invalid location provided. Please check your input and try again.');
                return;
            }
            else if (response.status === 401) {
                // 401 = Unauthorized (invalid API key most likely)
                throw new Error('Invalid Weather API key.');
            } else {
                throw new Error(`WeatherAPI returned status ${response.status}`);
            }
        }

        // Step 10: Parse the JSON response
        const data = await response.json();

        // Step 11: Extract weather information from the response (lots to initialize)

        // Location
        const locationName = data.location.name;
        const region = data.location.region;
        const country = data.location.country;

        // Current weather data
        const tempC = data.current.temp_c;
        const tempF = data.current.temp_f;
        const condition = data.current.condition.text;
        const feelsLikeC = data.current.feelslie_c;
        const feelsLikeF = data.current.feelslike_f;
        const humidity = data.current.humidity;
        const windKph = data.current.wind_kph;
        const windMph = data.current.wind_mph;
        const windDir = data.current.wind_dir;

        // Step 12: Build theweather message report
        let weatherMessage = `**Weather for ${locationName}`;

        // Add region and counry if available
        if (region) {
            weatherMessage += `, ${region}`;
        }
        weatherMessage += `, ${country}**\n`;

        // Tempurature
        weatherMessage += `Temperature: ${tempC}°C (${tempF}°F)\n`;

        // Condition
        weatherMessage += `Condition: ${condition}\n`;

        // Feels like
        weatherMessage += `Feels Like: ${feelsLikeC}°C (${feelsLikeF}°F)\n`;

        // Humidity
        weatherMessage += `Humidity: ${humidity}%\n`;

        // Wind speed and direction
        weatherMessage += `Wind: ${windKph} kph (${windMph} mph) from ${windDir}\n`;

        // Step 13: Send the weather report to the channel
        await message.reply(weatherMessage);

    } catch (error) {
        // Step 14: Error handling
        console.error('Error fetching weather data:', error);

        // Send user-friendly error message
        if (error.message.includes('API key')) {
            // API ley issue - notify admin/developer
            await message.reply('There is a problem with the Weather API key. Please contact the bot administrator.');
        } else {
            // General error
            await message.reply('Sorry, could not fetch weather data at this time. Please try again later.');
        }
        
    }

};