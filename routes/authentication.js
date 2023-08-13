const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const { isLoggedIn } = require('../utils/middleware');

router.use(flash());

router.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/transactions/new',
    failureRedirect: '/authentication/login',
    failureFlash: 'Invalid employee num or password',
    successFlash: 'Welcome!'
}));

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/authentication/login');
});

module.exports = router;