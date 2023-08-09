const express = require('express');
const router = express.Router();
const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

//available accepts 0 or 1
const searchProduct = async (number, available) => {
    const q = 'SELECT * FROM products WHERE number = ? AND available = ?';
    const result = await db.query(q, [number, available]);
    const product = result[0][0];
    if(!product) throw new ExpressError('Product not found', 404);
    return product;
};

router.get('/buy/:number', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.number, 1);
    res.send(product);
}));

router.get('/return/:number', catchAsync(async (req, res, next) => {
    const product = await searchProduct(req.params.number, 0);
    res.send(product);
}));

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send({ message });
});

module.exports = router;