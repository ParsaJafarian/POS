const { insertCustomers, insertEmployees } = require('./people');
const insertProducts = require('./products');
const db = require('../config/db');

const insertFakeData = async () => {
    await db.query('DELETE FROM customers');
    await db.query('DELETE FROM employees');
    await db.query('DELETE FROM products');
    await insertCustomers(30);
    await insertEmployees(10);
    await insertProducts(30);
    console.log("Fake data inserted");
};

insertFakeData();