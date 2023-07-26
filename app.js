const mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hbc'
})

app.get('/', (req, res) => {
    res.send("home");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});