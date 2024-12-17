const express = require('express');
const http = require('http');
const io = require('socket.io');

const app = express();
const server = http.createServer(app);
const ws = new io.Server(server);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:3000/`);
});

ws.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('message', (msg) => {
        const userId = socket.id;
        ws.emit('message', msg, userId);
    });
});

app.use(express.static(__dirname, {
    extensions: ["html", "png"],
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});