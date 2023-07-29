const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("not home");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
