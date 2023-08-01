const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const configurePassport = require('./config/configPassport');
const ejsMate = require('ejs-mate');
const path = require('path');
require('dotenv').config();
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const cookieParser = require('cookie-parser');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));
app.use(cookieParser('keyboard cat'));
app.use(flash());
app.use(express.static('public'));
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
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/profile', (req, res) => {
    res.send('Profile page');
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
