DROP TABLE IF EXISTS discounts;

CREATE TABLE IF NOT EXISTS discounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(2,2) NOT NULL DEFAULT 0,
    CONSTRAINT valid_discount CHECK (amount >= 0 AND amount <= 1),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES (customers.id)
);