const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

router.get('/new', catchAsync((req, res) => {
    res.render('newTransaction', { messages: req.flash('error') });
}));

router.use((err, req, res, next) => {
    req.flash('error', err.message);
    res.redirect('/transactions/new');
});

module.exports = router;