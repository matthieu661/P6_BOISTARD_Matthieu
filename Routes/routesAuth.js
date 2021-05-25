const express = require('express');
const routerAuth = express.Router();

const CtrlUser = require('../Controllers/ControllersAuth');

routerAuth.post('/signup', CtrlUser.signup);
routerAuth.post('/login', CtrlUser.login);


module.exports = routerAuth ;