const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const { v4: uuid } = require('uuid');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'hbc'
});

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const types = ['T-Shirt', 'Polo', 'Sweatshirt', 'Hoodie', 'Jacket', 'Pants', 'Shorts', 'Hat', 'underwear', 'Other'];
const id = () => uuid();
const price = () => faker.commerce.price();
const type = () => types[Math.floor(Math.random() * types.length)];
const size = () => sizes[Math.floor(Math.random() * sizes.length)];
const is_final = () => Math.random() > 0.8;

const createProduct = () => {
    return [
        id(),
        price(),
        type(),
        size(),
        is_final()
    ]
}

const insertProducts = (n) => {
    const products = [];
    for (let i = 0; i < n; i++)
        products.push(createProduct());
    const q = 'INSERT INTO products (id, price, type, size, is_final) VALUES ?';
    connection.query(q, [products], (err, res) => {
        if (err) throw err;
        console.log(res);
    });
}

module.exports = insertProducts;