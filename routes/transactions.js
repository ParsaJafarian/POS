const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const db = require('../utils/db');
const ExpressError = require('../utils/ExpressError');
const completeTransaction = require('../utils/completeTransaction');
const { isLoggedIn } = require('../utils/middleware');

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const q = 'SELECT * FROM tp_view';
    const result = await db.query(q);
    const transactions = result[0];
    res.render('transactions', { transactions });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('new_transaction', { messages: req.flash('error') });
});

router.get('/:num', catchAsync(async (req, res, next) => {
    const q = 'SELECT * FROM transactions WHERE num = ?';
    const result = await db.query(q, [req.params.num]);
    const transaction = result[0][0];
    if (!transaction) throw new ExpressError('Transaction not found', 404);
    res.send(transaction);
}));

router.get('/:num/products', catchAsync(async (req, res, next) => {
    const q = `SELECT
                num,
                price,
                is_available,
                type,
                size,
                brand
            FROM tp
                JOIN products ON products.num = tp.product_num
            WHERE trans_num = ?`;
    const result = await db.query(q, [req.params.num]);
    const products = result[0];
    res.render('units', { products, trans_num: req.params.num});
}));

router.post('/', catchAsync(async (req, res, next) => {
    if (!req.user) throw new ExpressError('User not authenticated', 401);
    await completeTransaction(req.user.num, req.body.trans_num, req.body.product_nums);
    console.log('Transaction completed');
    res.redirect('/transactions/new');
}));

router.use((err, req, res, next) => {
    req.flash('error', err.message);
    res.redirect('/transactions/new');
});

module.exports = router;