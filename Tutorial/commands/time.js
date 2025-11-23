
// Step 1: Export command handler function
module.exports = async (message, args) => {

    // Step 2: Get current Unix timestamp (since Jan 1st, 1970)
    let timestamp = Math.floor(Date.now() / 1000);

    // Step 3: Initialize variables for UTC offset and format type
    let utcOffset = 0; // Default to UTC no adjustment
    let formatType = 'f'; // Default format: short date/time

    // Step 4: Parse arguments if provided
    // args[0] UTC offset
    // args[1] format type
    //  t - short time
    //  T - long time
    //  d - short date
    //  D - long date
    //  f - short date/time (default)
    //  F - long date/time
    //  R - relative time

    // Valid format types (case-sensitive)
    const validFormats = ['t', 'T', 'd', 'D', 'f', 'F', 'R'];

    // Step 4.1: Loop through all args and identify each
    for (const arg of args) {
        const numValue = parseInt(arg);

        // Check if it's a valid number for UTC offset
        if (!isNaN(numValue) && numValue.toString() === arg.replace('+', '')) {
            utcOffset = numValue;
        }
        // Check if its a valid format type (case-sensitive)
        else if (arg === 't' || arg === 'T' || arg === 'd' || arg === 'D' || arg === 'f' || arg === 'F' || arg === 'R') {
            // Preserve exact case for format type
            formatType = arg === 'R' ? 'r' : arg;
        }

    };

    // Step 5: Apply UTC offset to timestamp
    timestamp += utcOffset * 3600;

    // Step 6: Format timestamp using Discord's timestamp syntax
    // Syntax: <t:TIMESTAMP:TYPE>

    const formattedTime = `<t:${timestamp}:${formatType}>`;

    // Step 7: Build response message
    let response = `**Current Time**\n`;

    if (utcOffset !== 0) {
        const offsetSign = utcOffset > 0 ? '+' : '';
        response += `Timezone: UTC${offsetSign}${utcOffset}\n`;
    } else {
        response += `Timezone: Server Time (UTC+0)\n`;
    }

    response += `Time: ${formattedTime}\n`;

    // Step 8: Send the formmated time to the channel
    await message.reply(response);

};