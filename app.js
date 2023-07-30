const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const configRoutes = require('./config/configRoutes');
const configViews = require('./config/configViews');
const configurePassport = require('./config/configPassport');   

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(flash());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

configRoutes(app);
configViews(app);
configurePassport(app, passport);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/failure', (req, res) => {
    res.send("Failure");
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
