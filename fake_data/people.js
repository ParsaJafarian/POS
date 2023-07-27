const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const { v4: uuid } = require('uuid');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hbc'
});

const id = () => uuid();
const firstName = () => faker.person.firstName();
const lastName = () => faker.person.lastName();
const email = () => faker.internet.email();
const phone = () => faker.phone.number('514-###-####')
const discount = () => {
    const rand = parseFloat(Math.random().toFixed(2));
    if(rand === 1) return rand - 0.1;
    else return rand;
};
const password = () => faker.internet.password();

const createPerson = () => {
    return [
        id(),
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
const insertCustomers = (n) => {
    const customers = [];
    for (let i = 0; i < n; i++)
        customers.push(createCustomer());
    const q = 'INSERT INTO customers (id, first_name, last_name, email, phone, discount) VALUES ?';
    connection.query(q, [customers], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};
const insertEmployees = (n) => {
    const employees = [];
    for (let i = 0; i < n; i++)
        employees.push(createEmployee());
    const q = 'INSERT INTO employees (id, first_name, last_name, email, phone, password) VALUES ?';
    connection.query(q, [employees], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};

module.exports = { insertCustomers, insertEmployees };