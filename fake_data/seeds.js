const { insertEmployees } = require('./people');
const { insertProducts, updateProducts } = require('./products');
const insertTransactions = require('./transactions');
const insertTransactionProducts = require('./tp');
const db = require('../utils/db');

const insertFakeData = async () => {
    await db.query('DELETE FROM tp');
    await db.query('DELETE FROM products');
    await db.query('DELETE FROM transactions');
    await db.query('DELETE FROM employees');

    await insertEmployees(10);
    await insertTransactions(30);
    await insertProducts(30);
    await insertTransactionProducts(30);
    await updateProducts();
    console.log("Fake data inserted");
};

insertFakeData();