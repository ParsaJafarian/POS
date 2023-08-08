DROP TABLE IF EXISTS index;

CREATE TABLE
    IF NOT EXISTS index (
        trans_num INT NOT NULL,
        product_num INT NOT NULL,
        FOREIGN KEY (trans_num) REFERENCES transactions(number),
        FOREIGN KEY (product_num) REFERENCES products(number),
        PRIMARY KEY (trans_num, product_num)
    );