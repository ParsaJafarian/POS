const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pool = require('./config/mysql');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("home");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
