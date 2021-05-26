const express = require('express');
const routerSauces = express.Router();
// vers controllers
const CtrlSauces = require('../Controllers/ControlllersSauces');
// vers MiddlewareAuth
const Authentification = require('../Middleware/MiddlewareAuth');
// vers Multer
const Multer =require('../Middleware/Multer-config');


// MIDDLEWARES  (Projet 6 demande 8 middlewares) : 4- "Post" ; 1- "Put" ; 1- "Delete" ; 2 "Get"  ( 2 dans routesAuth.js login, signup)


routerSauces.post('/', Authentification, Multer, CtrlSauces.createSauces);

/*
routerSauces.post((req, res, next) => {
    res.json({ message: " express ok"});
});

            Likes
  
*/

routerSauces.put('/:id', Authentification, Multer, CtrlSauces.modifySauces);
routerSauces.delete('/:id',Authentification, CtrlSauces.deleteSauces);
routerSauces.get('/:id',Authentification, CtrlSauces.getOneSauces);
routerSauces.get('/sauces',Authentification, CtrlSauces.getAllSauces);


module.exports = routerSauces;