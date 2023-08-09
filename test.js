const db = require('./utils/db');

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