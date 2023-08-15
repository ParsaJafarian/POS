const db = require('./utils/db');

const printTransactions = async (employee_num) => {
    const q = 'SELECT * FROM transactions WHERE employee_num = ?';
    const result = await db.query(q, [employee_num]);
    const transactions = result[0];
    transactions.forEach(transaction => console.log(transaction));
};

printTransactions(21252044);