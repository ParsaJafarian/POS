const express = require('express');
const router = express.Router();
const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.use('/:number', catchAsync(async (req, res, next) => {
    const number = req.params.number;
    if(!number) throw new ExpressError('Invalid product number', 400);
    const q = 'SELECT * FROM products WHERE number = ?';
    const result = await db.query(q, [number]);
    const product = result[0][0];
    if (!product) throw new ExpressError('Product not found', 404);
    res.send(product);
    next();
}));

module.exports = router;