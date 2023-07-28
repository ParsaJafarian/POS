const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const pool = require('../config/mysql');

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

const insertProducts = async (n) => {
    const products = [];
    for (let i = 0; i < n; i++)
        products.push(createProduct());
    const q = 'INSERT INTO products (id, price, type, size, is_final) VALUES ?';
    await pool.query(q, [products]);
};

module.exports = insertProducts;