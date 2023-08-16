DROP TABLE IF EXISTS tp;

CREATE TABLE
    IF NOT EXISTS tp (
        trans_num INT NOT NULL,
        last_trans_num INT,
        product_num INT NOT NULL,
        is_return BOOLEAN NOT NULL,
        FOREIGN KEY (trans_num) REFERENCES transactions(num),
        FOREIGN KEY (product_num) REFERENCES products(num),
        FOREIGN KEY (last_trans_num) REFERENCES transactions(num),
        PRIMARY KEY (trans_num, product_num)
    );