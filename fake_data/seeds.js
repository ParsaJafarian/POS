const { insertCustomers, insertEmployees } = require('./people');
const insertProducts = require('./products');
const insertTransactions = require('./transactions');
const insertTransactionProducts = require('./transaction_products');
const db = require('../config/db');

const insertFakeData = async () => {
    await db.query('DELETE FROM transaction_products');
    await db.query('DELETE FROM products');
    await db.query('DELETE FROM transactions');
    await db.query('DELETE FROM employees');

    await insertEmployees(30);
    await insertTransactions(100);
    await insertProducts(100);
    await insertTransactionProducts(100);
    console.log("Fake data inserted");
};

insertFakeData();