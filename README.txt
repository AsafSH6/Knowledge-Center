The script (format_ads.js in public/scripts) contains "var index" which is initialized to -1 and used to test different dates.
If you choose to use my test cases, set index to 0 and remove the comment mark from lines 7 to 18.
Remember to change the screen ID to check the different cases.

getRelevantMessages returns array which treated as stack with the messages that relevant to the date in "today".

The script reloads every 3minutes the messages from the server in case something changed.

To run the sever, run the code in server.js