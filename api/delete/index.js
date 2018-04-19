const express = require('express');
const routes = express.Router();
const db = require('../../db');

routes.delete('/playlist/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dbResponse = await db.deletePlaylist(id);
        return res.status(200).json(dbResponse);
    } catch (err) {
        return res.status(404).json({ error: err });
    }
});

module.exports = routes;
