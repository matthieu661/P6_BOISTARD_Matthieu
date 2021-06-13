const express = require('express'); 
 
const bodyParser = require('body-parser');
// correction
// query injection
const mongoSanitize = require('express-mongo-sanitize');
// xss
const xss = require('xss-clean');
// ////////////////////////
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
 
const path = require('path');
const routesSauces = require('./Routes/routesSauc');
const routesAuth = require('./Routes/routesAuth'); 





mongoose.connect('mongodb+srv://ProjectDataAccessAdmin:openclassrooms@Projet6.h0qiv.mongodb.net/Projet6OpenClassrooms?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // appel express avant les "app.use.."


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const limiter = rateLimit({ 
    max: 100, 
    windowMs: 60 * 1000,
    message: "Too many request from this IP"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// correction 
// query Sql
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);
// XSS
app.use(xss());
// /////////////


/*function clean (req, res, next) {
  // replace an HTTP posted body property with the sanitized string
  const sanitizedString = req.sanitize(req.body.email);
  // send the response -- res.body.sanitized = " world"
  res.send({ sanitized: sanitizedString });
};*/


//app.use(expressSanitizer());
app.use(limiter); 
app.use(helmet());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', routesSauces);
app.use('/api/auth' , routesAuth);

module.exports = app; // exporte express via "app."