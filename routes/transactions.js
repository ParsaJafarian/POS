const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const db = require('../utils/db');
const ExpressError = require('../utils/ExpressError');
const completeTransaction = require('../utils/completeTransaction');
const { isLoggedIn } = require('../utils/middleware');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const q = "SELECT trans_num AS num, employee_num, DATE_FORMAT(date, '%d-%m-%Y') AS date, SUM(price) AS total FROM transaction_products JOIN transactions ON transactions.num = transaction_products.trans_num JOIN products ON products.num = transaction_products.product_num GROUP BY num";
    const result = await db.query(q, [req.user.num]);
    const transactions = result[0];
    res.render('transactions', { transactions });
}));

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