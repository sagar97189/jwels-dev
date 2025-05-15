// A simple Node.js server for the jewelry website
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get local IP addresses
function getLocalIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const iface in interfaces) {
        for (const details of interfaces[iface]) {
            // Only include IPv4 addresses that aren't internal (localhost)
            if (details.family === 'IPv4' && !details.internal) {
                addresses.push(details.address);
            }
        }
    }
    
    return addresses;
}

// Set port
const PORT = process.env.PORT || 8080;

// Create server
const server = http.createServer((req, res) => {
    // Handle requests here - this is a very simple implementation
    // A real server would use a proper static file server
    
    // Get the file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = path.extname(filePath);
    
    // Set content type based on file extension
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile('./index.html', (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}/\n`);
    
    const ips = getLocalIPs();
    if (ips.length > 0) {
        console.log('You can also access it via your local network at:');
        ips.forEach(ip => {
            console.log(`http://${ip}:${PORT}/`);
        });
    }
    
    console.log('\nShare these URLs with friends on the same network');
    console.log('\nPress Ctrl+C to stop the server\n');
});

// Note: This is a very basic server
// For production use, use a proper server like http-server, Express, etc. 