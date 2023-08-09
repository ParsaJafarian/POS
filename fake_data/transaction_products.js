const db = require('../config/db');

const product_num = async () => {
    const q = 'SELECT number FROM products';
    const result = await db.query(q);
    const products = result[0];
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex].number;
}

const trans_num = async () => {
    const q = 'SELECT number FROM transactions';
    const result = await db.query(q);
    const transactions = result[0];
    const randomIndex = Math.floor(Math.random() * transactions.length);
    return transactions[randomIndex].number;
}

const createTransactionProduct = async () => {  
    return [
        await trans_num(),
        await product_num()
    ]
}

const insertTransactionProducts = async (n) => {
    const transactionProducts = [];
    for (let i = 0; i < n; i++){
        const transactionProduct = await createTransactionProduct();
        if(!transactionProducts.includes(transactionProduct))
            transactionProducts.push(transactionProduct);
        else i--;
    }
    const q = 'INSERT INTO transaction_products (trans_num, product_num) VALUES ?';
    await db.query(q, [transactionProducts]);
}

module.exports = insertTransactionProducts;