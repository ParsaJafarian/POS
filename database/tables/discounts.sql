DROP TABLE IF EXISTS discounts;

CREATE TABLE
    IF NOT EXISTS discounts (
        number INT PRIMARY KEY AUTO_INCREMENT,
        amount DECIMAL(2, 2) NOT NULL DEFAULT 0,
        CONSTRAINT valid_amount CHECK (
            amount >= 0
            AND amount <= 1
        ),
        product_num INT NOT NULL,
        FOREIGN KEY (product_num) REFERENCES products(number)
    );

ALTER TABLE discounts AUTO_INCREMENT = 10000000;