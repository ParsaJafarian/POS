const db = require('../utils/db');

const product_num = async () => {
    const q = 'SELECT num FROM products';
    const result = await db.query(q);
    const productNums = result[0].map(product => product.num);
    const randomIndex = Math.floor(Math.random() * productNums.length);
    return productNums[randomIndex];
}

const trans_num = async () => {
    const q = 'SELECT num FROM transactions';
    const result = await db.query(q);
    const transactionNums = result[0].map(transaction => transaction.num);
    const randomIndex = Math.floor(Math.random() * transactionNums.length);
    return transactionNums[randomIndex];
}

const createTransactionProduct = async () => [await trans_num(), await product_num()];
const insertTransactionProducts = async (n) => {
    const transactionProducts = [];
    for (let i = 0; i < n; i++) {
        const transactionProduct = await createTransactionProduct();
        if (!transactionProducts.includes(transactionProduct))
            transactionProducts.push(transactionProduct);
        else i--;
    }
    const q = 'INSERT INTO transaction_products (trans_num, product_num) VALUES ?';
    await db.query(q, [transactionProducts]);
}

module.exports = insertTransactionProducts;