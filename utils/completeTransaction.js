const db = require('./db');

const addTransactions = async (employee_num) => {
    const q = 'INSERT INTO transactions (employee_num) VALUES (?)';
    const result = await db.query(q, [employee_num]);
    const trans_id = result[0].insertId;
    return trans_id;
};

const updateProducts = async (last_trans_num, product_nums) => {
    const q = 'UPDATE products SET is_available = IF(is_available = 1, 0, 1), last_trans_num = ? WHERE num  IN (?)';
    await db.query(q, [last_trans_num, product_nums]);
};

const addTransactionProducts = async (trans_num, product_nums) => {
    const q = 'INSERT INTO tp (trans_num, product_num) VALUES (?, ?)';
    for (let product_num of product_nums) {
        await db.query(q, [trans_num, product_num]);
    }
};

const completeTransaction = async (employee_num, product_nums) => {
    const trans_num = await addTransactions(employee_num);
    await updateProducts(trans_num, product_nums);
    await addTransactionProducts(trans_num, product_nums);
};

module.exports = completeTransaction;