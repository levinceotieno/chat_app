const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Log the received message on the server side
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients except the sender
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                try {
                    client.send(message);
                } catch (error) {
                    console.error(`Error sending message: ${error.message}`);
                }
            }
        });
    });
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

