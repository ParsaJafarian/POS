const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { v4: uuid } = require('uuid');

router.set('view engine', 'ejs');
router.use()

router.get('/', (req, res) => {
    res.render('login', { message: req.flash('failure') });
});

router.post('/', async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
    const q = "INSERT INTO employees (id, first_name, last_name, email, phone, password) VALUES ?";
    const data = [[uuid(), req.body.first_name, req.body.last_name, req.body.email, req.body.phone, hash]];
    await db.query(q, [data]);
    req.flash('success', 'You have successfully registered!');
    res.redirect('/profile');
});

module.exports = router;