const express = require('express');
const router = express.Router();
const db = require('../config/db');
const catchAsync = require('../utils/catchAsync');

router.get('/:number', catchAsync(async (req, res) => {
    const number = req.params.number;
    const q = 'SELECT * FROM products WHERE number = ?';
    const result = await db.query(q, [number]);
    const product = result[0][0];
    if (!product) throw new Error('Product not found', 404);
    res.send(product);
}));

router.use((err, req, res, next) => {
    req.flash('error', err.message);
    res.redirect('/transactions/new');
})


module.exports = router;