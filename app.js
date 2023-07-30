const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/configPassport');
const session = require('express-session');


app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

app.set('view engine', 'ejs');
app.set('views', './views');

configurePassport(passport);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
