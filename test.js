const db = require('./config/db');
const q = "SELECT * FROM employees WHERE number = ?";
const number = 21252044;
const getEmployee = async (number) => {
    try {
        const results = await db.query(q, [number]);
        const employee = results[0][0];
        return employee;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const printEmployee = async (number) => {
    const employee = await getEmployee(number);
    console.log(employee);
};
