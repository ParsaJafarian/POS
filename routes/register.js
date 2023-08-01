const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { v4: uuid } = require('uuid');
const flash = require('connect-flash');

router.use(flash());

router.get('/', (req, res) => {
    res.render('register', { messages: req.flash('error') });
});

router.post('/', (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
    const q = "INSERT INTO employees (id, number, first_name, last_name, email, phone, password) VALUES ?";
    const data = [[uuid(), req.body.number, req.body.first_name, req.body.last_name, req.body.email, req.body.phone, hash]];
    db.query(q, [data])
        .then(res => {
            res.redirect('/login');
        }).catch(err => {
            req.flash('error', err.message);
            res.redirect('register');
        });
});

module.exports = router;