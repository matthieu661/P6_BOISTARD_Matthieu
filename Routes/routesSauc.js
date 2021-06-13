const express = require('express');
const routerSauces = express.Router();
const CtrlSauces = require('../Controllers/ControlllersSauces');
const Authentification = require('../Middleware/MiddlewareAuth');
const Multer = require('../Middleware/Multer-config');
/*const { body, validationResult } = require('express-validator');

const retourError = (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
};*/





routerSauces.post('/',
    // username must be an email
   /* [body('name').isLength({ min: 1 }),
        // password must be at least 5 chars long
        body('manufacturer').trim(),
            body('description').isLength({ min: 10 }),
                body('mainPepper').isLength({ min: 10 }),
                    body('imageUrl').isURL()],
                    

    retourError,*/ Authentification, Multer, CtrlSauces.createSauces); // create

routerSauces.post('/:id/like', Authentification, CtrlSauces.likeSauce); // like

routerSauces.put('/:id', Authentification, Multer, CtrlSauces.modifySauces); // modify

routerSauces.delete('/:id', Authentification, CtrlSauces.deleteSauces); // delete

routerSauces.get('/:id', Authentification, CtrlSauces.getOneSauces); // get one

routerSauces.get('/', Authentification, CtrlSauces.getAllSauces); // get all


module.exports = routerSauces;