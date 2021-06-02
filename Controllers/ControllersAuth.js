
const bcrypt = require('bcrypt');                // bcrypte package de securité
const User = require('../Models/users');
const jwt = require('jsonwebtoken');
const noSql = require('./Secure');
const MaskEmail = require('./Secure')

/*function maskator (sentence) {
    if (typeof sentence === "string") {
      let headMail = sentence.slice(0,1);
      let bodyMail = sentence.slice(1, sentence.length-4);
      let bottomMail = sentence.slice(sentence.length-4, sentence.length);
      let final = [];
      var masked = bodyMail.split('');
      var maskedMail = [];
      for(let i in masked) {
        masked[i] = '*';
        maskedMail += masked[i];  
      }
      final += headMail + maskedMail + bottomMail
      return final;
    }
    console.log(sentence + " is not a mail");
    return false
}*/

exports.signup = (req, res, next) => { // on ajoute new user
    if (noSql.ValidationEmail(req.body.email)) { // test secutité
        if (noSql.ValidationPassword(req.body.password)) { // test secutité 
            bcrypt.hash(req.body.password, 10) // number = "salage" 0 < + securisé
                .then(hash => {
                    const user = new User({
                        email: MaskEmail.MasquageEmail(req.body.email), // email into body
                        password: hash // string crypté into body
                    });
                    user.save() // fonction predef. 
                        .then(() => res.status(201).json({ message: " user crée !" }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
        }
    } else {
        return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
    }
};

exports.login = (req, res, next) => { //  pk 
    if (noSql.ValidationEmail(req.body.email)) { // test secutité
        if (noSql.ValidationPassword(req.body.password)) { // test secutité
            User.findOne({ email:  MaskEmail.MasquageEmail(req.body.email) })
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ error: 'user not found !' });
                    }
                    console.log("passe a bcrypt")
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'password not valid !' });
                            }
                            console.log("pass valid ok ver response")
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(                      // ERREUR 500 VENANT D'ICI ! partie token
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' },
                                )
                            });
                        })
                        .catch(error => res.status(500).json({ error }));

                })
                .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
        }
    } else {
        return res.status(401).json({ message: 'sans caractéres spéciaux svp !' });
    }

};

