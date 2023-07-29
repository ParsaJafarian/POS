DROP TABLE IF EXISTS customers;

CREATE TABLE
    IF NOT EXISTS customers (
        id VARCHAR(255) NOT NULL UNIQUE,
        number INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone CHAR(12) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        discount DECIMAL(2, 2) NOT NULL DEFAULT 0,
        CONSTRAINT valid_discount CHECK (
            discount >= 0
            AND discount < 1
        ),
        CONSTRAINT valid_customer_phone CHECK (
            phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
        ),
        CONSTRAINT valid_customer_email CHECK (
            email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        )
    );

ALTER TABLE customers AUTO_INCREMENT = 10000000;