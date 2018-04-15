const express = require('express');
const get = require('./get');
const newEndpoint = require('./new');
const routes = express.Router();

// ROUTES
routes.use('/get', get);
routes.use('/new', newEndpoint);

module.exports = routes;
