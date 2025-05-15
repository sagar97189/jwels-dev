@echo off
echo This script will help you share your jewelry website publicly.
echo.
echo IMPORTANT: You need to have ngrok installed for this to work.
echo If you don't have ngrok installed, visit: https://ngrok.com/download
echo.
echo Starting your local server...
start cmd /k "http-server -p 8080 -c-1"
echo.
echo If you have ngrok installed, run this command in a new terminal:
echo ngrok http 8080
echo.
echo Then share the URL that ngrok gives you with your friends.
echo.
echo Press any key to close this window...
pause > nul 