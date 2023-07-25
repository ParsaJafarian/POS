DROP TABLE IF EXISTS discounts;

CREATE TABLE IF NOT EXISTS discounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(2,2) NOT NULL DEFAULT 0,
    CONSTRAINT valid_amount CHECK (amount >= 0 AND amount <= 1),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);