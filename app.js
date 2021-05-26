// express
const express = require('express'); // appel le framework express
// Pour serverLocal
const path = require('path');
// body parser
const bodyParser = require('body-parser'); //package pour extraire objet JSON (Installé via npm install --save body-parser)
// mongoose :
const mongoose = require('mongoose'); // package de methode pour mangoDB 
// vers routes
const routesSauces = require('./Routes/routesSauc');
const routesAuth = require('./Routes/routesAuth'); 






mongoose.connect('mongodb+srv://Admin:Admin@projet6.h0qiv.mongodb.net/Projet6OpenClassrooms?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express(); // appel express avant les "app.use.."

// CORS : debloque la securité des navigateurs

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Converts
app.use(bodyParser.json()); // middleware global pour extraire le JSON venant de la requete client et pouvoir le traiter (POST)



// routes
app.use('/api/sauces', routesSauces);
app.use('/api/auth', routesAuth);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; // exporte express via "app."