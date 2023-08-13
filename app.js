const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const configurePassport = require('./utils/configPassport');
const ejsMate = require('ejs-mate');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const ExpressError = require('./utils/ExpressError');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(cookieParser('keyboard cat'));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configure passport 
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

//Configure ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Configure routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/profile', require('./routes/profile'));
app.use('/transactions', require('./routes/transactions'));
app.use('/products', require('./routes/products'));

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    const updatedErr = new ExpressError(message, statusCode);
    res.status(statusCode).render('error', { err: updatedErr});
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});