var express = require('express');
var router = express.Router();
const {Product} = require('../models/product');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const products = await Product.find();
  res.render('shop/index', { products });
});

module.exports = router;