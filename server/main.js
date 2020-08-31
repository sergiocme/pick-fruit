import express from 'express';
import http from 'http';

import createGame from '../web/gameFactory.js';
const game = createGame();

const app = express();
const server = http.createServer(app);

app.use(express.static('web'));

server.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
