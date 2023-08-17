const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../utils/db');
const catchAsync = require('../utils/catchAsync');

router.get('/', (req, res) => {
    res.render('register', { messages: req.flash('error') });
});

router.post('/', catchAsync(async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 12);
    const q = "INSERT INTO employees (num, first_name, last_name, email, phone, password) VALUES ?";
    const data = [[req.body.num, req.body.first_name, req.body.last_name, req.body.email, req.body.phone, hash]];
    await db.query(q, [data]);
    res.redirect('/auth/login');
}));

router.use((err, req, res, next) => {
    req.flash('error', err.message);
    res.redirect('/register');
});

module.exports = router;