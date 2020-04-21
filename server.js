const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Sset static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');
    socket.emit('message', 'Welcome to Chat App!');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has just joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has just left the chat');
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT} `));
