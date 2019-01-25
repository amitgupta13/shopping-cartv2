var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const {Product} = require('../models/product');

const csrfProtection = csrf();

router.use(csrfProtection);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const products = await Product.find();
  let productChunks = [];
  let chunkSize = 3;
  for(let i = 0; i < products.length; i+=chunkSize){
    productChunks.push(products.slice(i, i + chunkSize));
  }
  res.render('shop/index', { products:productChunks });
});

router.get('/user/signup', function(req, res, next){
  const messages = req.flash('error');
  res.render('user/signup', {csrfToken:req.csrfToken(), messages, hasErrors:messages.length > 0});
})

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signup',
  failureFlash:true
}));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile');
})

module.exports = router;