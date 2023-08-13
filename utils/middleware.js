module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in to access this page');
        return res.redirect('/auth/login');
    }
    next();
}