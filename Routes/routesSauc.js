const express = require('express');
const routerSauces = express.Router();
const CtrlSauces = require('../Controllers/ControlllersSauces');
const Authentification = require('../Middleware/MiddlewareAuth');
const Multer =require('../Middleware/Multer-config');


routerSauces.post('/', Authentification, Multer, CtrlSauces.createSauces); // create

routerSauces.post('/:id/like', Authentification, CtrlSauces.likeSauce); // like

routerSauces.put('/:id', Authentification, Multer, CtrlSauces.modifySauces); // modify

routerSauces.delete('/:id', Authentification, CtrlSauces.deleteSauces); // delete

routerSauces.get('/:id', Authentification, CtrlSauces.getOneSauces); // get one

routerSauces.get('/', Authentification, CtrlSauces.getAllSauces); // get all


module.exports = routerSauces;