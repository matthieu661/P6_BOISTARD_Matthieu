
const express = require('express');
const routerAuth = express.Router();
const CtrlUser = require('../Controllers/ControllersAuth');
const { body, validationResult } = require('express-validator');

const retourError = (req, res, next) =>
{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()  })
    }
    next();
};


routerAuth.post('/signup',
    // username must be an email
    [body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 10 })],
    retourError,
    CtrlUser.signup);


routerAuth.post('/login', CtrlUser.login);

module.exports = routerAuth;