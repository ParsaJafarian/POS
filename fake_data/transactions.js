const {faker} = require('@faker-js/faker');
const db = require('../config/db');

const date = () => faker.date.past();
const employee_num = async () => {
    const q = 'SELECT number FROM employees';
    const result = await db.query(q);
    const employees = result[0];
    const randomIndex = Math.floor(Math.random() * employees.length);
    return employees[randomIndex].number;
}

const createTransaction = async () => {
    return [
        date(),
        await employee_num()
    ]
}

const insertTransactions = async (n) => {
    const transactions = [];
    for (let i = 0; i < n; i++)
        transactions.push(await createTransaction());
    const q = 'INSERT INTO transactions (date, employee_num) VALUES ?';
    await db.query(q, [transactions]);
};

module.exports = insertTransactions;