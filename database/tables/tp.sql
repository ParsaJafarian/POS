DROP TABLE IF EXISTS tp;

CREATE TABLE
    IF NOT EXISTS tp (
        trans_num INT NOT NULL,
        product_num INT NOT NULL,
        FOREIGN KEY (trans_num) REFERENCES transactions(num),
        FOREIGN KEY (product_num) REFERENCES products(num),
        PRIMARY KEY (trans_num, product_num)
    );