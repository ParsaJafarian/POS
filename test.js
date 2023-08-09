const db = require('./config/db');

const employee_num = async () => {
    const q = 'SELECT num FROM employees';
    const result = await db.query(q);
    const employees = result[0];
    console.log(employees);
}

employee_num();