const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../utils/middleware');

const searchProduct = async (num, is_available) => {
    is_available = is_available ? 1 : 0;
    const q = 'SELECT * FROM products WHERE num = ? AND is_available = ?';
    const result = await db.query(q, [num, is_available]);
    const product = result[0][0];
    if (!product) throw new ExpressError('Product not found', 404);
    return product;
};

router.get('/', isLoggedIn, catchAsync(async (req, res, next) => {
    const q = 'SELECT * FROM products';
    const result = await db.query(q);
    const products = result[0];
    res.render('products', { products });
}));

router.get('/buy/:num', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.num, true);
    res.send(product);
}));

router.get('/return/:num', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.num, false);
    res.send(product);
}));

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send({ message });
});

module.exports = router;