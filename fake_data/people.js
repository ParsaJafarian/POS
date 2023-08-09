const { faker } = require('@faker-js/faker');
const db = require('../config/db');

const firstName = () => faker.person.firstName();
const lastName = () => faker.person.lastName();
const email = () => faker.internet.email();
const phone = () => faker.phone.num('514-###-####')
const discount = () => {
    const rand = parseFloat(Math.random().toFixed(2));
    if (rand === 1) return rand - 0.1;
    else return rand;
};
const password = () => faker.internet.password();

const createPerson = () => {
    return [
        firstName(),
        lastName(),
        email(),
        phone()
    ]
};
const createCustomer = () => {
    return [
        ...createPerson(),
        discount()
    ]
};
const createEmployee = () => {
    return [
        ...createPerson(),
        password()
    ]
};
const insertCustomers = async (n) => {
    const customers = [];
    for (let i = 0; i < n; i++)
        customers.push(createCustomer());
    const q = 'INSERT INTO customers ( first_name, last_name, email, phone, discount) VALUES ?';
    await db.query(q, [customers]);
};
const insertEmployees = async (n) => {
    const employees = [];
    for (let i = 0; i < n; i++)
        employees.push(createEmployee());
    const q = 'INSERT INTO employees ( first_name, last_name, email, phone, password) VALUES ?';
    await db.query(q, [employees]);
};

module.exports = { insertCustomers, insertEmployees };