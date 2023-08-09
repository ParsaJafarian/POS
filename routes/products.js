const express = require('express');
const router = express.Router();
const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const searchProduct = (number, available) => {
    const q = 'SELECT * FROM products WHERE number = ? AND available = ?';
    const result =  db.query(q, [number, available]);
    const product = result[0][0];
    if(!product) throw new ExpressError('Product not found', 404);
    return product;
};

router.get('/buy/:number', catchAsync(async (req, res, next) => {
    const product = searchProduct(req.params.number, 1);
    res.send()

}));

router.get('/return/:number', catchAsync(async (req, res, next) => {
    const number = req.params.number;
    if (!number) throw new ExpressError('Invalid product number', 400);
    const q = 'SELECT * FROM products WHERE number = ?';

router.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send({ message });
});

module.exports = router;