const socket = io();

socket.on('lobbyUpdate', (count) => {
  document.getElementById('playerCount').textContent = count;
});

socket.on('gameStart', (data) => {
  if (data.role === 'impostor') {
    alert(`Du bist der Impostor! Dein Hinweis: ${data.hint}`);
  } else {
    alert(`Dein Wort ist: ${data.word}`);
  }
});

function readyUp() {
  socket.emit('playerReady');
}
