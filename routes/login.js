const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');

router.use(flash());

router.get('/', (req, res) => {
    res.render('login', { messages: req.flash('error') });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: 'Invalid employee number or password',
    successFlash: 'Welcome!'
}));
 
module.exports = router;