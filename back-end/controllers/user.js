const User = require('../models/user');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  Bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      console.log(req.body);
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      Bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          return res.status(200).json({
            userId: user._id,
            token: Jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' })
          });
        })
        .catch((error) => res.status(500).json({ error:'1' }));
    })
    .catch((error) => res.status(500).json({ error:'2' }));
};
