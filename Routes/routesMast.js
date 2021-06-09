const express = require('express');
const master = express.Router();
const routesSauces = require('./routesSauc');
const routesAuth = require('./routesAuth');

master.use('/api/sauces', routesSauces);
master.use('/api/auth', routesAuth);


module.exports = master ;