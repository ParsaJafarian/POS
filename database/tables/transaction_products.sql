DROP TABLE IF EXISTS transaction_products;

CREATE TABLE
    IF NOT EXISTS transaction_products (
        trans_num INT NOT NULL,
        product_num INT NOT NULL,
        FOREIGN KEY (trans_num) REFERENCES transactions(num),
        FOREIGN KEY (product_num) REFERENCES products(num),
        PRIMARY KEY (trans_num, product_num)
    );