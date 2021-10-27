const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_conf');
const sauceInput = require("../middleware/input_sauces")

//Route post sauces

router.post('/', auth, multer, sauceCtrl.createSauce);

//Route get Allsauces

router.get('/', auth, sauceCtrl.getAllSauces);

// Route get Onesauce
router.get('/:id', auth, sauceCtrl.getOneSauce); 
 

// route modif sauce

router.put('/:id', auth,multer,sauceCtrl.modifySauce);
  

// route suppression sauce

router.delete('/:id', auth,  sauceCtrl.deleteSauce);
 
// route like dislike sauce

router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);
  

module.exports = router;
