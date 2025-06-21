# Word Guessing Game (Impostor Edition)

A real-time multiplayer party game inspired by "Spyfall" or "Who's is the Spy?" One Player doesn't know the secret word - can you spot the impostor before it's too late?

---

## Features

- Real-time multiplayer with Socket.io
- Lobby system with player readiness status
- Flip card interface to reveal or hide secret word/hint
- modern dark-blue theme with centered layout
- mobile-friendly and responsive design

---

## Installation

```bash

1. **Clone the repository**

  git clone https://github.com/Niklas2211/wordgame.git
  cd wordgame
  npm install
  node server/index.js

  Open your browser at http://localhost:3000

2. **Project Structure**

  .
  ├── public/
  │   ├── index.html
  │   ├── style.css
  │   └── script.js
  ├── words.json
  ├── gamemanager.js
  ├── index.js
  └── README.md

3. **Deployment**

  You can deploy this app to e.g. render.com as a Node.js Web Service
  - Set index.js as the entry point
  - Use the environment port (process.env.PORT)
  - Everything (client + server) runs in a single deployment

```

## How to play

1. Each player enters a nickname when joining the game.
2. Once all players press "Ready", the game starts.
3. Every player sees a card with the secret word - except one.
4. The Impostor only sees a vague hint.
5. Discuss and vote - who's pretending?

## License

MIT - Free to use, modify, and share. Have fun!
