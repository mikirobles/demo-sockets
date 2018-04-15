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
    socket.emit('now', {
        message: 'zeit',
    });
});
