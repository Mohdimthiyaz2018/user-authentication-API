const express = require('express');
const { getProducts } = require('../Controllers/productController');
const router = express.Router();
const isAuthenticated = require('../Middlewares/isAuthenticated');

router.route('/products/getAllProducts').get(isAuthenticated, getProducts);

module.exports = router;