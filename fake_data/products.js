const { faker } = require('@faker-js/faker');
const db = require('../utils/db');

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const types = ['T-Shirt', 'Polo', 'Sweatshirt', 'Hoodie', 'Jacket', 'Pants', 'Shorts', 'Hat', 'underwear', 'Other'];
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Under Armour', 'Hugo Boss', 'Tommy Hilfiger', 'Calvin Klein', 'Rodd and Gunn', 'Hugo Boss', 'Other'];;

const price = () => faker.commerce.price();
const type = () => types[Math.floor(Math.random() * types.length)];
const size = () => sizes[Math.floor(Math.random() * sizes.length)];
const is_available = () => Math.random() > 0.8 ? 1 : 0;
const brand = () => brands[Math.floor(Math.random() * brands.length)];

const createProduct = () => [price(), type(), size(), is_available(), brand()];
const insertProducts = async (n) => {
    const products = [];
    for (let i = 0; i < n; i++)
        products.push(createProduct());
    const q = 'INSERT INTO products ( price, type, size, is_available, brand) VALUES ?';
    await db.query(q, [products]);
};

const setLastTransNum = async () => {
    const select = 'SELECT num FROM products';
    const result = await db.query(select);
    const productNums = result[0].map(product => product.num);

    for (let num of productNums) {
        const update = `UPDATE products
                SET last_trans_num = (
                    SELECT MAX(trans_num) AS last_trans_num 
                    FROM transaction_products 
                    WHERE product_num = ${num}
                )
                WHERE num = ${num}`;
        await db.query(update);
    };
};

const setAvailable = async () => {
    const update = `UPDATE products SET is_available = 1 WHERE ISNULL(last_trans_num)`;
    await db.query(update);
};

const updateProducts = async () => {
    await setLastTransNum();
    await setAvailable();
};

module.exports = { insertProducts, updateProducts };