const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const gameManager = require('./gameManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static('public'));

// Handle connections
io.on('connection', (socket) => {
  console.log('New Player:', socket.id);

  // Player joins Lobby
  gameManager.handleJoin(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});