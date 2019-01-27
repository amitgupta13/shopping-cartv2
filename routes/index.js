var express = require('express');
var router = express.Router();
const {Product} = require('../models/product');
const Cart = require('../models/cart');
const {Order} = require('../models/order');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const successMsg = req.flash('success')[0];
  const products = await Product.find();
  let productChunks = [];
  let chunkSize = 3;
  for(let i = 0; i < products.length; i+=chunkSize){
    productChunks.push(products.slice(i, i + chunkSize));
  }
  res.render('shop/index', { title:'Shopping Cart', products:productChunks, successMsg, noMessage:!successMsg });
});

router.get('/add-to-cart/:id', function(req, res, next){
  const productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart : {});

  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    // console.log('product---->', product._id);
    cart.add(product, product._id);
    req.session.cart = cart;
    // console.log('cart---->',req.session.cart);
    res.redirect('/shopping-cart');
  })
});

router.get('/reduce/:id', function(req, res, next){
  const productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
  const productId = req.params.id;
  let cart = new Cart(req.session.cart? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {products: null});
  }

  const cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', {products:cart.gererateArray(), totalPrice:cart.totalPrice});
})

router.get('/checkout',isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  const cart = new Cart(req.session.cart);

  const errMsg = req.flash('error')[0];
  
  res.render('shop/checkout', {total:cart.totalPrice, errMsg, noError:!errMsg})
});

router.post('/checkout',isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }

  const cart = req.session.cart;

  const stripe = require('stripe')('sk_test_uqy0ebxUH8cAcCZWt1iBeuIc');

  stripe.charges.create({
    amount:cart.totalPrice*100,
    currency:'usd',
    source:req.body.stripeToken,
    description:'Test charge'
  },function(err, charge){
    if(err){
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    // console.log('user -->',req.user);
    const order = new Order({
      user: req.user,
      cart:cart,
      address:req.body.address,
      name:req.body.name,
      paymentId:charge.id
    });

    order.save(function(err, result){
      req.flash('success', 'Successfully bought Product');
      req.session.cart = null;
      res.redirect('/');
    })
  })
})

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}