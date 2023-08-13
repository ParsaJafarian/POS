const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../utils/middleware');

router.get('/', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;