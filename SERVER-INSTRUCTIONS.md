# How to Share Your Jewelry Website

This guide will help you run a local server to share your website with friends.

## Requirements
- Node.js and npm (installed)
- http-server package (installed globally)

## How to Start the Server

### Windows
1. Double-click the `start-server.bat` file
2. A command window will open showing your IP address
3. The server will start automatically on port 8080

### Manual Start (alternative)
If the batch file doesn't work, you can manually start the server:
1. Open a command prompt/terminal
2. Navigate to the website folder: `cd path/to/jewelry/website`
3. Run: `http-server -p 8080 -c-1`

## Sharing with Friends

### Same Local Network (Wi-Fi)
If your friends are on the same network (like your home Wi-Fi):
1. Give them your local IP address shown when starting the server
2. They should enter: `http://YOUR-IP-ADDRESS:8080` in their browser

### Different Networks
To share with friends on different networks:
1. Consider using services like ngrok, localhost.run, or localtunnel
2. Example with ngrok (if installed):
   ```
   ngrok http 8080
   ```
3. Share the URL provided by ngrok

## Stopping the Server
- Press `Ctrl+C` in the command window
- Close the command window

## Troubleshooting
- If friends can't connect, check your firewall settings
- Make sure port 8080 is allowed in your firewall settings
- Try a different port if 8080 is blocked (change in the bat file) 