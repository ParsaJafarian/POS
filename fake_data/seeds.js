const { insertCustomers, insertEmployees } = require('./people');
const insertProducts = require('./products');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hbc'
});

const deleteAndInsert = (q, f,n) => {
    connection.query(q, (err, res) => {
        if (err) throw err;
        console.log(res);
        f(n);
    });
};

const insertFakeData = () => {
    deleteAndInsert('DELETE FROM customers', insertCustomers, 30);
    deleteAndInsert('DELETE FROM employees', insertEmployees, 10);
    deleteAndInsert('DELETE FROM products', insertProducts, 30);
};

insertFakeData();
connection.end();