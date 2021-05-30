const express = require('express');
const routerSauces = express.Router();
// vers controllers
const CtrlSauces = require('../Controllers/ControlllersSauces');
// vers MiddlewareAuth
const Authentification = require('../Middleware/MiddlewareAuth');
// vers Multer
const Multer =require('../Middleware/Multer-config');


// MIDDLEWARES  (Projet 6 demande 8 middlewares) : 4- "Post" ; 1- "Put" ; 1- "Delete" ; 2 "Get"  ( 2 dans routesAuth.js login, signup)


routerSauces.post('/', Authentification, Multer, CtrlSauces.createSauces); // create

routerSauces.post('/:id/like', Authentification, CtrlSauces.likeSauce); // like

routerSauces.put('/:id', Authentification, Multer, CtrlSauces.modifySauces); // modify

routerSauces.delete('/:id', Authentification, CtrlSauces.deleteSauces); // delete

routerSauces.get('/:id', Authentification, CtrlSauces.getOneSauces); // get one

routerSauces.get('/', Authentification, CtrlSauces.getAllSauces); // get all


module.exports = routerSauces;