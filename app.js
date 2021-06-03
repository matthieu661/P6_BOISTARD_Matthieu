const express = require('express'); 
const mongoose = require('mongoose'); 
const routesSauces = require('./Routes/routesSauc');
const routesAuth = require('./Routes/routesAuth'); 
const path = require('path');
const bodyParser = require('body-parser'); 
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

mongoose.connect('mongodb+srv://Admin:Admin@projet6.h0qiv.mongodb.net/Projet6OpenClassrooms?retryWrites=true&w=majority',
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

app.use(limiter); 
app.use(helmet());

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', routesSauces);
app.use('/api/auth', routesAuth);

module.exports = app; // exporte express via "app."