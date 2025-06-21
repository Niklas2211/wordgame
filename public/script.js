const socket = io();

let myNickname = null;

function submitNickname() {
  const input = document.getElementById("nicknameInput");
  const nickname = input.value.trim();
  if (nickname.length === 0) {
    alert("Please enter your Nickname!");
    return;
  }

  myNickname = nickname;
  socket.emit("setNickname", nickname);
  document.getElementById("nicknameModal").style.display = "none";
}

socket.on("lobbyUpdate", (players) => {
  document.getElementById("playerCount").textContent = players.length;
  const list = document.getElementById("playerList");
  list.innerHTML = "";
  players.forEach((player) => {
    const li = document.createElement("li");
    li.classList.add("player-item");
    li.textContent = `${player.nickname || "Player"} – ${player.ready ? "✅ Ready" : "⏳ Waiting"}`;
    list.appendChild(li);
  });

  document.getElementById("gameCard").classList.add("hidden");
});

socket.on("gameStart", (data) => {
  const container = document.getElementById("gameCard");
  const card = container.querySelector(".card");
  const titleBack = document.getElementById("cardTitleBack");
  const contentBack = document.getElementById("cardContentBack");

  if (data.role === "impostor") {
    titleBack.textContent = "Impostor 🤫";
    contentBack.textContent = `Hint: ${data.hint}`;
  } else {
    titleBack.textContent = "Secret Word 🔐";
    contentBack.textContent = data.word;
  }

  container.classList.remove("hidden");
  card.classList.remove("flipped");
});

socket.on("lobbyRestarted", () => {
  alert("Lobby has been reset successfully!");
  document.getElementById("gameCard").classList.add("hidden");
});

function readyUp() {
  socket.emit("playerReady");
}

function restartGame() {
  socket.emit("restartLobby");
}

function flipCard() {
  const card = document.querySelector(".card");
  card.classList.toggle("flipped");
}
