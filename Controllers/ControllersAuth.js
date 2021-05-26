
const bcrypt = require('bcrypt');                // bcrypte package de securité
const User = require('../Models/users');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => { // on ajoute new user
    bcrypt.hash(req.body.password, 10) // number = "salage" 0 < + securisé
        .then(hash => {
            const user = new User({
                email: req.body.email, // email into body
                password: hash // string crypté into body
            });
            user.save() // fonction predef. 
                .then(() => res.status(201).json({ message: " user crée !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => { //  pk 
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'user not found !' });
            }
            console.log("passe a bcrypt")
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error : 'password not valid !' });
                    }
                    console.log("pass valid ok ver response")
                    res.status(200).json({
                        userId : user._id, 
                        token: jwt.sign(                      // ERREUR 500 VENANT D'ICI ! partie token
                        { userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' },
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
                
        })
        .catch(error => res.status(500).json({ error }));
        
};

