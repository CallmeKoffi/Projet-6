const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

require('dotenv').config();


const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// Connection à MongoDB

mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers pour l'APP

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Vary', 'Origin');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Implantation bodyparser dans l'app
app.use(bodyParser.json());

// 
app.use(express.json());
// création route authentification
app.use('/api/auth', userRoutes);

// création route sauces
app.use('/api/sauces', saucesRoutes);

// image dans l'app
app.use('/images', express.static(path.join(__dirname, 'images')));




module.exports = app;
