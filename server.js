const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Sset static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Admin Bot';

// Run when client connects
io.on('connection', socket => {

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Chat App!'));

    // Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName,'A user has just joined the chat'));

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has just left the chat'));
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });
});
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT} `));
