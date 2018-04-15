const express = require('express');
const routes = express.Router();
const db = require('../../db');

routes.get('/playlists', async (req, res) => {
    return res.json(await db.getPlaylists());
});

routes.get('/playlist/:id', async (req, res) => {
    const id = req.params.id;
    return res.json(await db.getPlaylist(id));
});

module.exports = routes;