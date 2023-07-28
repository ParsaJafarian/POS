const { insertCustomers, insertEmployees } = require('./people');
const insertProducts = require('./products');
const pool = require('../config/mysql');

const insertFakeData = async () => {
    await pool.query('DELETE FROM customers');
    await pool.query('DELETE FROM employees');
    await pool.query('DELETE FROM products');
    await insertCustomers(30);
    await insertEmployees(10);
    await insertProducts(30);
    console.log("Fake data inserted");
    pool.end();
};

insertFakeData();