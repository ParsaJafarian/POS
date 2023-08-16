const db = require('./db');

const addTransaction = async (employee_num) => {
    const q = 'INSERT INTO transactions (employee_num) VALUES (?)';
    await db.query(q, [employee_num]);
};

const getTransNum = async () => {
    const q = 'SELECT num FROM transactions ORDER BY num DESC LIMIT 1';
    const result = await db.query(q);
    return result[0][0].num;
};

const updateProducts = async (trans_num, product_nums) => {
    const q = 'UPDATE products SET last_trans_num = ? ,is_available = IF(is_available = 1, 0, 1) WHERE num IN (?)';
    await db.query(q, [trans_num, product_nums]);
};

const getIsAvailable = async (product_num) => {
    const q = 'SELECT is_available FROM products WHERE num = ?';
    const result = await db.query(q, [product_num]);
    return result[0][0].is_available;
};

const addTransactionProducts = async (trans_num, last_trans_num, product_nums) => {
    const q = 'INSERT INTO tp (trans_num, last_trans_num, product_num, is_return) VALUES (?,?,?,?)';
    for (let product_num of product_nums) {
        const is_available = await getIsAvailable(product_num);
        await db.query(q, [trans_num, last_trans_num, product_num, is_available]);
    }
};

const completeTransaction = async (employee_num, last_trans_num, product_nums) => {
    await addTransaction(employee_num);
    const trans_num = await getTransNum();
    await updateProducts(trans_num, product_nums);
    console.log('updated products');
    await addTransactionProducts(trans_num, last_trans_num, product_nums);
    console.log('added transaction products');
};

module.exports = completeTransaction;