@echo off
echo Starting jewelry website server...
echo.
echo Your website will be available at:
echo.
ipconfig | findstr /C:"IPv4 Address"
echo.
echo If server starts successfully, you can access it at:
echo http://YOUR-IP-ADDRESS:8080
echo.
echo To share with friends on your local network, give them this address
echo Press Ctrl+C to stop the server when done
echo.
http-server -p 8080 -c-1 