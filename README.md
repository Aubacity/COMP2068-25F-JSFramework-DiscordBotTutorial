# COMP2068-25F-JSFramework-DiscordBotTutorial - Message-Based Commands

#### AI Generated Documentation (Title flagged to comply with Syllabus)

Comprehensive guide to build a Discord bot. This guide will walk you through creating a fully functional bot with message-based commands, external API integrations, persistent data storage, and user authentication.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Command Explanations](#command-explanations)
- [Project Structure](#project-structure)
- [API Information](#api-information)
- [Deployment](#deployment)
- [Security Notes](#security-notes-proper-etiquette)
- [Troubleshooting](#troubleshooting)
- [Learning Path](#learning-path)
- [Your Next Step Hereafter](#your-next-step-hereafter)

## Overview

This project is a Discord bot built using Discord.js v14 that demonstrates fundamental bot development concepts including command handling, API integration, user authentication, and persistent data storage. The bot features a modular command structure with individual handlers for different functionalities, making it easy to understand, maintain, and extend.

The bot uses a message-based command system with a prefix (`!`) and implements a simple authentication mechanism requiring users to greet the bot before accessing other commands. All user data and game statistics are stored in a local JSON file, demonstrating basic data persistence without requiring a database.

## Features

- **Message-Based Commands**: Traditional prefix-based command system using `!` as the command prefix
- **User Authentication**: Simple authentication system requiring users to use `!hello` before accessing other commands
- **Persistent Data Storage**: JSON-based storage for user profiles and game statistics
- **External API Integration**: Integration with JokeAPI and WeatherAPI for dynamic content
- **Interactive Gaming**: Rock-Paper-Scissors game with win/loss/tie tracking
- **Statistics Tracking**: Comprehensive game statistics with win rate calculations
- **Time Zone Support**: Flexible time display with UTC offset support and multiple format options
- **Error Handling**: Robust error handling for API failures and invalid user input
- **Channel Restriction**: Dedicated channel support to prevent bot spam across servers
- **Modular Architecture**: Clean separation of concerns with individual command handlers

## Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Node.js**: Version 16.9.0 or higher (Discord.js v14 requirement)
- **npm**: Node Package Manager (comes with Node.js)
- **Discord Account**: Required to create a Discord application and bot
- **Code Editor**: Visual Studio Code, Sublime Text, or any preferred editor
- **Terminal/Command Line**: Basic familiarity with command line interface
- **Git** (optional): For cloning the repository

**API Keys Required:**
- Discord Bot Token (free, obtained from Discord Developer Portal)
- WeatherAPI Key (free tier available at weatherapi.com)

## Setup Instructions

### Step 1: Clone/Download the Project

Clone the repository using Git or download the ZIP file:

```bash
git clone https://github.com/Aubacity/COMP2068-25F-JSFramework-DiscordBotTutorial.git
cd COMP2068-25F-JSFramework-DiscordBotTutorial/Tutorial
```

Alternatively, download the ZIP file from GitHub and extract it to your desired location.

### Step 2: Install Dependencies

Navigate to the Tutorial directory and install the required Node.js packages:

```bash
cd Tutorial
npm install
```

This will install:
- `discord.js` (v14.25.1): Discord API wrapper for Node.js
- `dotenv` (v17.2.3): Environment variable management
- `node-fetch@2` (v2.x): HTTP request library for API calls (v2 required for CommonJS compatibility)

### Step 3: Create Discord Bot Application

1. Visit the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section in the left sidebar
4. Click "Add Bot" and confirm
5. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent (optional)
   - Presence Intent (optional)
6. Click "Reset Token" to generate your bot token
7. Copy the token immediately (you won't be able to see it again)

**Important**: Never share your bot token publicly. It grants full access to your bot.

### Step 4: Invite Bot to your Discord Server

1. In the Discord Developer Portal, navigate to "OAuth2" > "URL Generator"
2. Select the following scopes:
   - `bot`
3. Select the following bot permissions:
   - Send Messages
   - Read Message History
   - Read Messages/View Channels
4. Copy the generated URL and paste it into your browser
5. Select the server you want to add the bot to (you must have "Manage Server" permissions)
6. Click "Authorize"

### Step 5: Get WeatherAPI Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Click "Sign Up" and create a free account
3. After logging in, navigate to your dashboard
4. Copy your API key from the dashboard
5. The free tier provides 1,000,000 calls per month, which is more than sufficient for this project

### Step 6: Configure Environment Variables

1. In the Tutorial directory, create a file named `.env`
2. Add the following environment variables:

```env
DISCORD_TOKEN=your_discord_bot_token_here
WEATHER_API_KEY=your_weatherapi_key_here
```

3. Replace the placeholder values with your actual tokens
4. Save the file

**Important**: Add `.env` to your `.gitignore` file to prevent accidentally committing sensitive information.

### Step 7: Run the Bot (Locally/Test/Debug)

Before running the bot, you need to configure the allowed channel ID in `index.js`:

1. Open `index.js` in your code editor
2. Locate line 58: `const ALLOWED_CHANNEL = '558077225304457244';`
3. Replace the channel ID with your Discord channel ID:
   - Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
   - Right-click on the channel you want the bot to use
   - Click "Copy Channel ID"
   - Paste the ID in the code

Start the bot:

```bash
node index.js
```

You should see output similar to:
```
Bot is online as YourBotName#1234
Serving 1 server(s)
Type !hello in your server to get started.
```

### Step 8: Host the Bot on a JavaScript Framework Accepted Platform (Render.com is a Good Choice)

For 24/7 uptime, deploy your bot to a cloud hosting platform. Render.com offers a free tier suitable for this project.

**Deployment Steps for Render.com:**

1. Create a [Render.com](https://render.com) account
2. Connect your GitHub repository to Render
3. Create a new "Web Service"
4. Configure the service:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free
5. Add environment variables:
   - `DISCORD_TOKEN`
   - `WEATHER_API_KEY`
6. Deploy the service

**Note**: The free tier on Render may spin down after inactivity. For true 24/7 uptime, consider upgrading to a paid plan or using alternatives like Railway, Heroku, or a VPS.

## Command Explanations

All commands use the `!` prefix. Users must authenticate with `!hello` before using any other commands.

### Command 1: `!hello`

**Purpose**: User authentication and registration

**Syntax**: `!hello`

**Description**: 
This command serves as the authentication mechanism for the bot. When a user first interacts with the bot using this command, it creates a user profile in the `users.json` file with the following information:
- User ID (Discord snowflake)
- Username
- Authentication status
- Game statistics (initialized with zeros)

If a user has already authenticated, the bot welcomes them back. This command is the only one accessible without prior authentication.

**Example Usage**:
```
User: !hello
Bot: Hello, Username! You have been authenticated successfully.
```

**Technical Details**:
- Creates a new user entry in `users.json` if the user doesn't exist
- Initializes game statistics structure for Rock-Paper-Scissors
- Updates username if it has changed since last authentication
- Writes data to persistent storage using Node.js fs module

---

### Command 2: `!help`

**Purpose**: Display all available commands and their usage

**Syntax**: `!help`

**Description**: 
Provides a comprehensive list of all bot commands with their syntax, arguments, and brief descriptions. Shows command details including format options and shortcuts. Requires authentication before use.

**Example Usage**:
```
User: !help
Bot: **AubacityBot - Available Commands:**
     
     **!hello** - Authenticate with the bot and create your profile
     **!help** - Display this help message with all commands
     **!time [UTC_offset] [format]** - Get current time with timezone offset and format options
     ...
```

**Information Provided**:
- List of all available commands with syntax
- Brief description of each command's purpose
- Additional details about arguments and format options
- Shortcuts and alternative input methods

**Technical Details**:
- Simple command handler with no external dependencies
- Returns formatted string with all command information
- Requires user authentication before access
- Uses Discord's reply method for clean message threading

---

### Command 3: `!time [UTC_Offset] [Format_Type]`

**Purpose**: Display current time with customizable timezone and format

**Syntax**: `!time [UTC_offset] [format_type]`

**Parameters**:
- `UTC_offset` (optional): Numeric offset from UTC (e.g., -5, +3, 0)
- `format_type` (optional): Discord timestamp format type

**Available Format Types**:
- `t`: Short time (e.g., 9:41 PM)
- `T`: Long time (e.g., 9:41:30 PM)
- `d`: Short date (e.g., 11/23/2025)
- `D`: Long date (e.g., November 23, 2025)
- `f`: Short date/time (default) (e.g., November 23, 2025 9:41 PM)
- `F`: Long date/time (e.g., Saturday, November 23, 2025 9:41 PM)
- `R`: Relative time (e.g., 2 minutes ago)

**Example Usage**:
```
!time              → Shows current time in UTC with default format
!time -5           → Shows time in UTC-5 (EST) with default format
!time -5 T         → Shows time in UTC-5 with long time format
!time +0 R         → Shows relative time from UTC
```

**Technical Details**:
- Calculates Unix timestamp and adjusts for timezone offset
- Uses Discord's native timestamp formatting for client-side localization
- Parses arguments flexibly (order doesn't matter)
- Default format is 'f' (short date/time)

---

### Command 4: `!joke`

**Purpose**: Fetch and display a random programming joke

**Syntax**: `!joke`

**Description**:
Retrieves a random programming joke from the JokeAPI. The bot filters out inappropriate content by blacklisting NSFW, racist, sexist, and explicit flags. Jokes can be either single-line or two-part (setup and punchline).

**Example Usage**:
```
User: !joke
Bot: **Programming Joke:**
     Why do programmers prefer dark mode?
     
     Because light attracts bugs!
```

**Technical Details**:
- Uses JokeAPI endpoint: `https://v2.jokeapi.dev/joke/Programming`
- Implements content filtering with blacklist flags
- Handles both single-part and two-part joke formats
- Displays typing indicator while fetching for better UX
- Includes comprehensive error handling for API failures

---

### Command 5: `!rps [Choice]`

**Purpose**: Play Rock-Paper-Scissors against the bot

**Syntax**: `!rps [choice]`

**Parameters**:
- `choice`: Your move (rock, paper, scissors, or shorthand r, p, s)

**Accepted Inputs**:
- Full names: `rock`, `paper`, `scissors`
- Shorthand: `r`, `p`, `s`
- Case insensitive

**Example Usage**:
```
User: !rps rock
Bot: **Rock Paper Scissors!**
     Your choice: **rock** against my choice: **scissors**
     **You win!**
```

**Game Rules**:
- Rock beats Scissors
- Paper beats Rock
- Scissors beats Paper
- Same choice results in a tie

**Technical Details**:
- Bot randomly selects from available choices
- Automatically updates user statistics in `users.json`
- Tracks wins, losses, and ties separately
- Validates user input before processing
- Persists statistics immediately after each game

---

### Command 6: `!score`

**Purpose**: Display personal game statistics

**Syntax**: `!score`

**Description**:
Shows comprehensive statistics for all games played by the user. Currently tracks Rock-Paper-Scissors statistics including total games, wins, losses, ties, and win rate percentage.

**Example Usage**:
```
User: !score
Bot: **Username's Game Statistics:**

     **Rock-Paper-Scissors:**
     - Total Games: 47
     - Wins: 18
     - Losses: 21
     - Ties: 8
     - Win Rate: 38.3%
```

**Technical Details**:
- Retrieves user data from `users.json`
- Calculates win rate: (wins / total games) × 100
- Displays message if user hasn't played any games yet
- Extensible structure for adding more game types
- Handles missing or incomplete data gracefully

---

### Command 7: `!weather [location]`

**Purpose**: Retrieve current weather information for any location

**Syntax**: `!weather [location]`

**Parameters**:
- `location`: City name, region, or full address (e.g., "Toronto", "London, UK", "New York, NY, USA")

**Example Usage**:
```
User: !weather Toronto, Ontario, Canada
Bot: **Weather for Toronto, Ontario, Canada**
     Temperature: 5°C (41°F)
     Condition: Partly cloudy
     Feels Like: 2°C (36°F)
     Humidity: 71%
     Wind: 15 kph (9 mph) from W
```

**Information Provided**:
- Location name, region, and country
- Current temperature (Celsius and Fahrenheit)
- Weather condition description
- "Feels like" temperature (wind chill/heat index)
- Humidity percentage
- Wind speed (kph and mph) and direction

**Technical Details**:
- Uses WeatherAPI.com current weather endpoint
- Requires API key stored in environment variables
- Displays typing indicator while fetching data
- Handles invalid locations with user-friendly error messages
- Supports flexible location formats (commas for precision)
- URL-encodes location string for API compatibility

## Project Structure

```
COMP2068-25F-JSFramework-DiscordBotTutorial/
├── Demo/                          # Classroom demonstration files (duplicate of Tutorial)
├── Tutorial/                      # Main project directory
│   ├── commands/                  # Command handler modules
│   │   ├── hello.js              # User authentication and registration
│   │   ├── help.js               # Command help and usage information
│   │   ├── time.js               # Time display with timezone support
│   │   ├── joke.js               # Programming joke fetcher (JokeAPI)
│   │   ├── rps.js                # Rock-Paper-Scissors game logic
│   │   ├── score.js              # User statistics display
│   │   └── weather.js            # Weather information (WeatherAPI)
│   ├── data/                      # Persistent data storage
│   │   └── users.json            # User profiles and game statistics
│   ├── index.js                   # Main bot file and event handlers
│   ├── package.json               # Node.js dependencies and metadata
│   ├── package-lock.json          # Dependency lock file
│   ├── .env                       # Environment variables (not in repo)
│   └── node_modules/              # Installed dependencies (not in repo)
└── README.md                      # Project documentation (this file)
```

**Key Files Description**:

**`index.js`**: 
Main entry point for the bot. Handles:
- Discord client initialization with required intents
- Event listeners for bot ready and message create events
- Command routing and authentication verification
- Data directory and users.json initialization
- Channel restriction enforcement
- Error handling for unhandled rejections

**`commands/hello.js`**: 
Handles user authentication and profile creation. Creates user entries with Discord ID, username, authentication status, and initializes game statistics structure.

**`commands/help.js`**: 
Provides a comprehensive command reference for users. Displays all available commands with syntax, arguments, and brief descriptions. Requires authentication before use.

**`commands/time.js`**: 
Displays current time with flexible timezone offset and format options. Parses arguments dynamically and uses Discord's native timestamp formatting.

**`commands/joke.js`**: 
Fetches programming jokes from JokeAPI with content filtering. Handles both single-part and two-part joke formats with appropriate formatting.

**`commands/rps.js`**: 
Implements Rock-Paper-Scissors game logic with bot opponent. Updates user statistics in real-time and validates user input with shorthand support.

**`commands/score.js`**: 
Displays comprehensive game statistics including total games, win/loss/tie counts, and calculated win rate percentage.

**`commands/weather.js`**: 
Retrieves current weather data from WeatherAPI for any location worldwide. Displays temperature, conditions, humidity, and wind information in both metric and imperial units.

**`data/users.json`**: 
JSON file storing user profiles and statistics. Structure:
```json
{
  "userId": {
    "userId": "string",
    "username": "string",
    "authenticated": boolean,
    "games": {
      "rps": {
        "wins": number,
        "losses": number,
        "ties": number
      }
    }
  }
}
```

**`package.json`**: 
Defines project metadata and dependencies. Specifies CommonJS module type and lists required packages with their versions.

## API Information

This project integrates with two external APIs for enhanced functionality.

### JokeAPI (Free, No Key Required)

**Official Website**: [https://jokeapi.dev/](https://jokeapi.dev/)

**Endpoint Used**: 
```
https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit
```

**Features**:
- Completely free with no API key required
- Returns programming-themed jokes
- Supports content filtering via blacklist flags
- Two joke formats: single-part and two-part (setup/delivery)
- No rate limiting on free tier

**Response Format**:
```json
{
  "error": false,
  "category": "Programming",
  "type": "single",
  "joke": "Joke text here",
  "flags": {
    "nsfw": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  }
}
```

**Implementation Notes**:
- Blacklisted flags ensure family-friendly content
- Error handling for API downtime or network issues
- Typing indicator improves user experience during fetch

---

### WeatherAPI (Free Tier Provides Required Key)

**Official Website**: [https://www.weatherapi.com/](https://www.weatherapi.com/)

**Endpoint Used**:
```
http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={LOCATION}&aqi=no
```

**Free Tier Limits**:
- 1,000,000 API calls per month
- Current weather data access
- Forecast up to 3 days (not used in this project)
- Real-time weather updates
- No credit card required for free tier

**Features**:
- Global coverage (millions of locations)
- Supports multiple location formats (city, coordinates, IP, postal code)
- Returns both metric and imperial units
- Includes feels-like temperature, humidity, wind data
- Auto-complete suggestions (not implemented in this project)

**Response Data Used**:
- Location name, region, country
- Current temperature (°C and °F)
- Weather condition description
- Feels-like temperature
- Humidity percentage
- Wind speed (kph and mph) and direction

**Implementation Notes**:
- API key stored securely in environment variables
- URL encoding for location strings with special characters
- Error handling for invalid locations and API failures
- Comprehensive data extraction for user-friendly display

**Rate Limiting Considerations**:
With 1,000,000 calls per month on the free tier, you can make approximately:
- 33,333 calls per day
- 1,388 calls per hour
- 23 calls per minute

This is more than sufficient for most Discord bot implementations.

## Deployment

### Local Deployment/Development

**Starting the Bot**:
```bash
cd Tutorial
node index.js
```

**Expected Console Output**:
```
Bot is online as BotName#1234
Serving 1 server(s)
Type !hello in your server to get started.
```

**Development Tips**:
- Use `console.log()` statements for debugging
- Monitor the `data/users.json` file to verify data persistence
- Test error handling by intentionally providing invalid inputs
- Use Discord Developer Mode to easily copy IDs
- Keep terminal window open to view real-time logs

**Stopping the Bot**:
- Press `Ctrl+C` in the terminal
- The bot will go offline immediately

---

### Deploying to Render.com

**Prerequisites**:
- GitHub account with your bot repository
- Render.com account (free tier available)

**Step-by-Step Deployment**:

1. **Prepare Your Repository**:
   - Ensure `.env` is in `.gitignore`
   - Commit all code changes
   - Push to GitHub

2. **Create Render Account**:
   - Visit [render.com](https://render.com)
   - Sign up with GitHub (recommended for easy integration)

3. **Create New Web Service**:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your bot

4. **Configure Service Settings**:
   - **Name**: Choose a unique name for your service
   - **Region**: Select closest to your target users
   - **Branch**: `main` (or your primary branch)
   - **Root Directory**: Leave empty (or specify `Tutorial` if needed)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. **Add Environment Variables**:
   - Click "Advanced" or navigate to "Environment" tab
   - Add the following key-value pairs:
     - Key: `DISCORD_TOKEN`, Value: Your Discord bot token
     - Key: `WEATHER_API_KEY`, Value: Your WeatherAPI key

6. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy your bot automatically
   - Monitor the deployment logs for any errors

7. **Verify Deployment**:
   - Check that the bot shows as online in Discord
   - Test all commands to ensure functionality
   - Monitor logs in Render dashboard for errors

**Important Notes for Render.com**:
- Free tier services spin down after 15 minutes of inactivity
- First request after inactivity may have a delay (cold start)
- For 24/7 uptime, upgrade to paid tier ($7/month) or use keep-alive services
- Logs are retained for limited time on free tier

**Alternative Hosting Platforms**:
- **Railway**: Similar to Render, offers free tier with usage-based pricing
- **Heroku**: No longer offers free tier, but reliable paid hosting
- **DigitalOcean**: VPS hosting with more control, requires server management
- **AWS EC2**: Free tier for 12 months, requires more configuration
- **Google Cloud**: Free tier available, requires more setup

## Security Notes (Proper Etiquette)

**Never Commit Sensitive Information**:
- Always add `.env` to `.gitignore` before committing
- Never hardcode API keys or tokens directly in source code
- Use environment variables for all sensitive data
- Review commits before pushing to ensure no secrets are included

**Discord Bot Token Security**:
- Treat your bot token like a password
- Regenerate token immediately if accidentally exposed
- Never share token in screenshots, Discord messages, or public forums
- Use different tokens for development and production

**API Key Management**:
- Store all API keys in the `.env` file
- Limit API key permissions when possible
- Monitor API usage for suspicious activity
- Rotate keys periodically for enhanced security

**File Permissions**:
- Ensure `users.json` has appropriate read/write permissions
- On production servers, restrict file access to the bot process only
- Regularly backup `users.json` to prevent data loss

**Bot Permissions**:
- Only grant necessary permissions when inviting the bot
- Avoid Administrator permission unless absolutely required
- Review and audit bot permissions periodically
- Use role-based permissions for better control

**Channel Restrictions**:
- Implement channel ID filtering to prevent bot spam (as shown in `index.js`)
- Consider implementing command cooldowns to prevent abuse
- Monitor bot usage and implement rate limiting if necessary

**Code Security Best Practices**:
- Validate and sanitize all user inputs
- Implement proper error handling to avoid information leakage
- Keep dependencies updated to patch security vulnerabilities
- Use `npm audit` regularly to check for known vulnerabilities

**Data Privacy**:
- Only store necessary user information
- Implement data retention policies
- Provide users with ability to delete their data
- Comply with Discord's Terms of Service and Developer Policy

## Troubleshooting

**Bot Doesn't Come Online**:
- Verify Discord token is correct in `.env` file
- Check that `.env` file is in the same directory as `index.js`
- Ensure all required intents are enabled in Discord Developer Portal
- Check console for error messages
- Verify Node.js version is 16.9.0 or higher

**Bot Doesn't Respond to Commands**:
- Confirm you're using the correct command prefix (`!`)
- Verify you're in the allowed channel (check ALLOWED_CHANNEL in `index.js`)
- Ensure you've authenticated with `!hello` first
- Check that the bot has permission to read and send messages
- Review console logs for errors

**"Invalid Token" Error**:
- Regenerate token in Discord Developer Portal
- Update `.env` file with new token
- Ensure no extra spaces or quotes around token in `.env`
- Restart the bot after updating `.env`

**Weather Command Not Working**:
- Verify WeatherAPI key is correct in `.env`
- Check that you haven't exceeded free tier limit (1M calls/month)
- Ensure location format is correct (try simpler queries like just city name)
- Check WeatherAPI status page for service outages
- Review console logs for specific error messages

**Joke Command Not Working**:
- Check internet connection (API requires network access)
- Verify JokeAPI is not blocked by firewall
- Check JokeAPI status at jokeapi.dev
- Review console logs for fetch errors

**Commands Work But Data Not Persisting**:
- Verify `data` directory exists and bot has write permissions
- Check `users.json` file is being created/updated
- Ensure file paths are correct (absolute vs relative)
- Review console logs for file system errors
- On some hosting platforms, file system writes may be restricted

**Module Not Found Errors**:
- Run `npm install` in the Tutorial directory
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Verify `package.json` exists and is valid JSON
- Check Node.js and npm are properly installed

**Bot Keeps Crashing**:
- Review error messages in console carefully
- Check for unhandled promise rejections
- Verify all async functions have proper error handling
- Ensure all required environment variables are set
- Monitor memory usage (especially on free hosting tiers)

**RPS Game Statistics Not Updating**:
- Verify `users.json` has write permissions
- Check that user is authenticated with `!hello`
- Review console logs for file write errors
- Ensure JSON structure in `users.json` is valid

**Time Command Shows Wrong Time**:
- Verify UTC offset is calculated correctly
- Remember Discord shows time in user's local timezone when using relative format
- Check that format type is a valid option (t, T, d, D, f, F, R)

**Channel Restriction Not Working**:
- Ensure you've updated ALLOWED_CHANNEL constant in `index.js`
- Verify channel ID is correct (enable Developer Mode in Discord)
- Check that ID is a string, not a number
- Restart bot after changing channel ID

**Common Error Messages**:

```
Error: Used disallowed intents
```
Solution: Enable Message Content Intent in Discord Developer Portal

```
DiscordAPIError: Missing Permissions
```
Solution: Grant bot necessary permissions (Send Messages, Read Message History)

```
Error: Cannot find module 'discord.js'
```
Solution: Run `npm install` to install dependencies

```
Error: Invalid WeatherAPI key
```
Solution: Verify API key in `.env` and check WeatherAPI account status

## Learning Path

**Files to Study in Order:**

1. **`index.js`** - Start here to understand the bot's core structure
   - Learn how Discord client is initialized with intents
   - Study event handlers for 'ready' and 'messageCreate' events
   - Understand command routing and authentication flow
   - See how user data is loaded and managed
   - Review error handling patterns

2. **`commands/hello.js`** - Simple authentication implementation
   - Learn basic file I/O with Node.js fs module
   - Understand user data structure and initialization
   - Study conditional logic for new vs returning users
   - See how to create and update JSON data
   - Practice async/await patterns

3. **`commands/help.js`** - Basic command handler and string formatting
   - Understand simple command structure without external dependencies
   - Learn how to build formatted multi-line strings
   - Practice creating user-friendly documentation within the bot
   - See basic message reply patterns
   - Study static response handlers

4. **`commands/time.js`** - Argument parsing and Discord formatting
   - Learn to parse and validate command arguments
   - Understand Unix timestamps and timezone calculations
   - Study Discord's native timestamp formatting
   - Practice flexible argument handling (order-independent)
   - See how to provide user-friendly format options

5. **`commands/joke.js`** - External API integration basics
   - Understand HTTP GET requests with node-fetch
   - Learn API response handling and JSON parsing
   - Study error handling for network requests
   - See how to implement typing indicators for better UX
   - Practice handling different response formats

6. **`commands/rps.js`** - Game logic and data persistence
   - Learn game state management
   - Study random number generation for game mechanics
   - Understand how to update nested JSON structures
   - See comprehensive input validation techniques
   - Practice persistent data storage patterns

7. **`commands/score.js`** - Data retrieval and formatting
   - Learn to read and parse user data from JSON
   - Study mathematical calculations (win rate percentage)
   - Understand conditional rendering based on data availability
   - Practice building formatted text responses
   - See how to handle missing or incomplete data

8. **`commands/weather.js`** - Advanced API integration
   - Study complex API requests with authentication
   - Learn to handle API-specific error codes
   - Understand URL encoding for user inputs
   - See how to extract and format extensive API responses
   - Practice comprehensive error messaging for users

**Key Concepts to Master**:
- Asynchronous JavaScript (async/await, Promises)
- File system operations (fs.readFileSync, fs.writeFileSync)
- JSON data manipulation (parse, stringify)
- HTTP requests and API integration
- Error handling and user feedback
- Discord.js library fundamentals
- Environment variable management
- Command-based architecture patterns

## Your Next Step Hereafter

After completing this tutorial, consider adding your own additions:

**More Games**:
- Trivia quiz with categories and scoring
- Hangman with word databases
- Blackjack or other card games
- Tic-tac-toe with visual board display
- Number guessing games with difficulty levels
- Memory matching games
- Word scramble challenges

**Database Integration**:
- Replace JSON storage with MongoDB for scalability
- Implement SQLite for relational data structure
- Add PostgreSQL for advanced queries
- Create database backup and restore functionality
- Implement data migration tools

**Slash Commands**:
- Migrate from message-based to slash commands (Discord's modern standard)
- Implement command autocomplete for better UX
- Add command descriptions and usage examples
- Create command groups and subcommands
- Utilize Discord's native permission system

**Music Playback Functionality**:
- Integrate with Discord voice channels
- Implement YouTube/Spotify playback
- Add queue management (skip, pause, resume)
- Create playlist functionality
- Add music controls and now-playing displays

**Moderation Commands**:
- User kick and ban functionality
- Automatic spam detection and prevention
- Warning system with escalating consequences
- Message purging and cleanup
- Role management automation
- Server logging and audit trails

**Custom Embeds for Prettier Responses**:
- Replace plain text with rich embeds
- Add colors based on command type or status
- Include thumbnails and images
- Create interactive buttons and menus
- Add fields for organized information display
- Implement pagination for long responses

**Additional Enhancement Ideas**:
- Multi-server configuration with server-specific settings
- User leveling and experience systems
- Economy system with virtual currency
- Custom command creation by users
- Scheduled tasks and reminders
- Integration with other APIs (news, stocks, cryptocurrency)
- Localization and multi-language support
- Advanced analytics and usage statistics
- Web dashboard for bot management
- Custom event logging and notifications

**Best Practices for Extensions**:
- Keep code modular and maintainable
- Write comprehensive error handling
- Document your code with clear comments
- Test features thoroughly before deployment
- Consider rate limits and performance
- Follow Discord's Terms of Service and API guidelines
- Implement proper logging for debugging
- Use version control (Git) for tracking changes