import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

import createGame from '../web/gameFactory.js';
const game = createGame();

game.addFruit({ id: 'fruit1', positionX: 3, positionY: 3 });

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const pathForWebClient = path.resolve(path.dirname(''), 'web');
app.use(express.static(pathForWebClient));

sockets.on('connection', (socket) => {
  console.log('socket: ', socket.id);
  game.addPlayer({ id: socket.id, positionX: 0, positionY: 0 });

  socket.emit('state', game.state);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
