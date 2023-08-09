const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

//is_available accepts 0 or 1
const searchProduct = async (num, is_available) => {
    const q = 'SELECT * FROM products WHERE num = ? AND is_available = ?';
    const result = await db.query(q, [num, is_available]);
    const product = result[0][0];
    if (!product) throw new ExpressError('Product not found', 404);
    return product;
};

router.get('/buy/:num', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.num, 1);
    res.send(product);
}));

router.get('/return/:num', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.num, 0);
    res.send(product);
}));

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send({ message });
});

module.exports = router;