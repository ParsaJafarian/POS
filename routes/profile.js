const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../utils/middleware');

router.get('/', isLoggedIn, (req, res) => {
    res.send('Profile page');
});

module.exports = router;