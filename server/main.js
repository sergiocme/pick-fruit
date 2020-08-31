const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static('web'));

server.listen(3000, () => {
  console.log('Server is running on port 3333...');
});
