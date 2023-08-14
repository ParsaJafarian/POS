const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const db = require('../utils/db');
const ExpressError = require('../utils/ExpressError');
const completeTransaction = require('../utils/completeTransaction');
const { isLoggedIn } = require('../utils/middleware');

router.get('/new', isLoggedIn, (req, res) => {
    res.render('new_transaction', { messages: req.flash('success') });
});

router.get('/:num', catchAsync(async (req, res) => {
    const q = 'SELECT * FROM transactions WHERE num = ?';
    const result = await db.query(q, [req.params.num]);
    const transaction = result[0][0];
    if (!transaction) throw new ExpressError('Transaction not found', 404);
    res.send(transaction);
}));

router.post('/', catchAsync(async (req, res) => {
    await completeTransaction(req.user.num, req.body.productNums);
    console.log('Transaction completed');
    req.flash('success', 'Transaction completed');
    res.redirect('/transactions/new');
}));

module.exports = router;