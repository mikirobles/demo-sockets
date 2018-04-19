const express = require('express');
const get = require('./get');
const newEndpoint = require('./new');
const deleteEndpoint = require('./delete');
const routes = express.Router();

// ROUTES
routes.use('/get', get);
routes.use('/new', newEndpoint);
routes.use('/delete', deleteEndpoint);

module.exports = routes;
