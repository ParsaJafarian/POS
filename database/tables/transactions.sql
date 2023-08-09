DROP TABLE IF EXISTS transactions;

CREATE TABLE
    IF NOT EXISTS transactions (
        number INT PRIMARY KEY AUTO_INCREMENT,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        employee_num INT NOT NULL,
        customer_num INT,
        FOREIGN KEY (employee_num) REFERENCES employees(number),
        FOREIGN KEY (customer_num) REFERENCES customers(number)
    );

ALTER TABLE transactions AUTO_INCREMENT = 10000000;