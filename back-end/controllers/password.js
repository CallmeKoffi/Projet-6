const passwordSchema = require('../models/password');

 module.exports = (req, res, next) => {
     if (!passwordSchema.validate(req.body.password)) {
         res.status(400).json({ message: 'Le mot de passe doit faire 10 caractère minimum, avec une majuscule, une minusculte et un chiffre.' });
     } else {
         next();     }
};