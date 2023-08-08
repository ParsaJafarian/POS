const db = require('./config/db');
const q = 'SELECT * FROM products WHERE number = ?';

db.query(q, [])
.then((res) => {
    const product = res[0][0];
    if(product) console.log(product);
    else console.log('Product not found');
})
.catch((err) => {
    console.log(err);
});

