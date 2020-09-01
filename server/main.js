import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

import createGame from '../web/gameFactory.js';
const game = createGame();

game.addFruit({ id: 'fruit1' });

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const pathForWebClient = path.resolve(path.dirname(''), 'web');
app.use(express.static(pathForWebClient));

sockets.on('connection', (socket) => {
  game.addPlayer({ id: socket.id });

  socket.emit('state', game.state);

  socket.on('disconnect', () => {
    game.removePlayer({ id: socket.id });
  });
});

game.subcribe(({ type, playersState }) => {
  sockets.emit(type, playersState);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
