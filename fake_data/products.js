const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const db = require('../config/db');

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const types = ['T-Shirt', 'Polo', 'Sweatshirt', 'Hoodie', 'Jacket', 'Pants', 'Shorts', 'Hat', 'underwear', 'Other'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Under Armour', 'Hugo Boss', 'Tommy Hilfiger', 'Calvin Klein', 'Rodd and Gunn', 'Hugo Boss', 'Other'];;

const id = () => uuid();
const price = () => faker.commerce.price();
const type = () => types[Math.floor(Math.random() * types.length)];
const size = () => sizes[Math.floor(Math.random() * sizes.length)];
const available = () => Math.random() > 0.8 ? 1 : 0;

const brand = () => brands[Math.floor(Math.random() * brands.length)];

const createProduct = () => {
    return [
        id(),
        price(),
        type(),
        size(),
        available(),
        brand()
    ]
}

const insertProducts = async (n) => {
    const products = [];
    for (let i = 0; i < n; i++)
        products.push(createProduct());
    const q = 'INSERT INTO products (id, price, type, size, available, brand) VALUES ?';
    await db.query(q, [products]);
};

module.exports = insertProducts;