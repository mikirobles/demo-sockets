const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = parseInt(process.env.PORT, 10) || 3000;
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
    dev: process.env.NODE_ENV !== 'production' && !process.env.NOW,
});
const nextHandler = nextApp.getRequestHandler();

const api = require('./api');

nextApp.prepare().then(() => {
    app.use(bodyParser.json());

    app.use('/api', api);

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

io.on('connect', socket => {
    socket.on('delete playlist', ({playlist}) => {
        socket.broadcast.emit('notification', {
            message: `${playlist.author} eliminó la playlist '${playlist.name}'`
        });
        socket.broadcast.emit('updatePlaylists');
    });
    socket.on('create playlist', ({ playlist }) => {
        socket.broadcast.emit('notification', {
            message: `${playlist.author} creó una nueva playlist llamada '${playlist.name}'`,
        });
        socket.broadcast.emit('updatePlaylists');
    });
    socket.on('user logged', ({ name }) => {
        socket.broadcast.emit('notification', {
            message: `${name} entró a la app!`,
        });
    });
});
