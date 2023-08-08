DROP TABLE IF EXISTS transaction_products;

CREATE TABLE
    IF NOT EXISTS transaction_products (
        trans_num INT NOT NULL,
        product_num INT NOT NULL,
        FOREIGN KEY (trans_num) REFERENCES transactions(number),
        FOREIGN KEY (product_num) REFERENCES products(number),
        PRIMARY KEY (trans_num, product_num)
    );