var express = require('express');
var router = express.Router();
const {Product} = require('../models/product');
const Cart = require('../models/cart');


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

router.get('/add-to-cart/:id', function(req, res, next){
  const productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart : {});

  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    console.log('product---->', product._id);
    cart.add(product, product._id);
    req.session.cart = cart;
    console.log('cart---->',req.session.cart);
    res.redirect('/');
  })
});

module.exports = router;