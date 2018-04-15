const express = require('express');
const routes = express.Router();
const db = require('../../db');

// ENDPOINTS
routes.post('/user', async (req, res) => {
    return res.json(await db.addUser(req.body.name));
});

routes.post('/playlist', async (req, res) => {
    res.json(await db.addPlaylist(req.body.name, req.body.author));
});

module.exports = routes;
