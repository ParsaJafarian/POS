const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const db = require('../utils/db');

router.get('/new', (req, res) => {
    res.render('newTransaction')
});

router.get('/:num', catchAsync(async (req, res) => {
    const q = 'SELECT * FROM transactions WHERE num = ?';
    const result = await db.query(q, [req.params.num]);
    const transaction = result[0][0];   
    if(!transaction) throw new ExpressError('Transaction not found', 404);
    res.send(transaction);
}));

module.exports = router;