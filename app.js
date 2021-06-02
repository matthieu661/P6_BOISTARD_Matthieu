// express
const express = require('express'); // appel le framework express
// mongoose :
const mongoose = require('mongoose'); // package de methode pour mangoDB 
// vers routes
const routesSauces = require('./Routes/routesSauc');
const routesAuth = require('./Routes/routesAuth'); 
// Pour serverLocal
const path = require('path');
// body parser
const bodyParser = require('body-parser'); //package pour extraire objet JSON (Installé via npm install --save body-parser)

mongoose.connect('mongodb+srv://Admin:Admin@projet6.h0qiv.mongodb.net/Projet6OpenClassrooms?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // appel express avant les "app.use.."

 // middleware global pour extraire le JSON venant de la requete client et pouvoir le traiter (POST)

// CORS : debloque la securité des navigateurs

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//  SECURITE
/*const svgCaptcha = require('svg-captcha');    ---> front

app.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    req.session.captcha = captcha.text;
    
    res.type('svg');
    res.status(200).send(captcha.data);
});*/
// brutforce
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({ // a tester
    max: 100, 
    windowMs: 60 * 1000,
    message: "Too many request from this IP"
});


app.use(limiter); // appliqué a toutes les routes 
// cookie 
/*const cookieSession = require('cookie-session')

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);*/

// HELMET
const helmet = require("helmet");
app.use(helmet());
// ///////////////////////////////////////////////////////////
// routes
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', routesSauces);
app.use('/api/auth', routesAuth);


module.exports = app; // exporte express via "app."