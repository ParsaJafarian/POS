DROP TABLE IF EXISTS transactions;

CREATE TABLE
    IF NOT EXISTS transactions (
        num INT PRIMARY KEY AUTO_INCREMENT,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        employee_num INT NOT NULL,
        customer_num INT,
        FOREIGN KEY (employee_num) REFERENCES employees(num),
        FOREIGN KEY (customer_num) REFERENCES customers(num)
    );

ALTER TABLE transactions AUTO_INCREMENT = 10000000;