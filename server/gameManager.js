const fs = require('fs');
const words = JSON.parse(fs.readFileSync(__dirname + '/words.json', 'utf8'));

const lobbies = {}; // { lobbyId: { players: [], readyCount: 0, gameStarted: false } }

function handleJoin(socket, io) {
  let lobbyId = 'main'; // Nur eine Lobby (für Startversion)

  if (!lobbies[lobbyId]) {
    lobbies[lobbyId] = { players: [], readyCount: 0, gameStarted: false };
  }

  const player = { id: socket.id, ready: false };
  lobbies[lobbyId].players.push(player);

  io.emit('lobbyUpdate', lobbies[lobbyId].players.length);

  // Spieler klickt "Bereit"
  socket.on('playerReady', () => {
    player.ready = true;
    lobbies[lobbyId].readyCount++;

    if (lobbies[lobbyId].readyCount === lobbies[lobbyId].players.length) {
      startGame(lobbyId, io);
    }
  });

  socket.on('disconnect', () => {
    lobbies[lobbyId].players = lobbies[lobbyId].players.filter(p => p.id !== socket.id);
    lobbies[lobbyId].readyCount = lobbies[lobbyId].players.filter(p => p.ready).length;
    io.emit('lobbyUpdate', lobbies[lobbyId].players.length);
  });
}

function startGame(lobbyId, io) {
  const lobby = lobbies[lobbyId];
  const wordEntry = words[Math.floor(Math.random() * words.length)];

  const impostorIndex = Math.floor(Math.random() * lobby.players.length);

  lobby.players.forEach((player, index) => {
    const socket = io.sockets.sockets.get(player.id);
    if (!socket) return;
    if (index === impostorIndex) {
      socket.emit('gameStart', { role: 'impostor', hint: wordEntry.hint });
    } else {
      socket.emit('gameStart', { role: 'normal', word: wordEntry.word });
    }
  });

  lobby.gameStarted = true;
}

module.exports = { handleJoin };
