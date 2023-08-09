DROP TABLE IF EXISTS employees;

CREATE TABLE
    IF NOT EXISTS employees (
        number INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        phone CHAR(12) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        CONSTRAINT valid_employee_phone CHECK (
            phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
        ),
        CONSTRAINT valid_employee_email CHECK (
            email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        )
    );

ALTER TABLE employees AUTO_INCREMENT = 10000000;