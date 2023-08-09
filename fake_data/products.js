const { faker } = require('@faker-js/faker');
const db = require('../config/db');

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const types = ['T-Shirt', 'Polo', 'Sweatshirt', 'Hoodie', 'Jacket', 'Pants', 'Shorts', 'Hat', 'underwear', 'Other'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Under Armour', 'Hugo Boss', 'Tommy Hilfiger', 'Calvin Klein', 'Rodd and Gunn', 'Hugo Boss', 'Other'];;

const price = () => faker.commerce.price();
const type = () => types[Math.floor(Math.random() * types.length)];
const size = () => sizes[Math.floor(Math.random() * sizes.length)];
const is_available = () => Math.random() > 0.8 ? 1 : 0;

const brand = () => brands[Math.floor(Math.random() * brands.length)];

const createProduct = () => {
    return [
        price(),
        type(),
        size(),
        is_available(),
        brand()
    ]
}

const insertProducts = async (n) => {
    const products = [];
    for (let i = 0; i < n; i++)
        products.push(createProduct());
    const q = 'INSERT INTO products ( price, type, size, is_available, brand) VALUES ?';
    await db.query(q, [products]);
};

module.exports = insertProducts;