DROP TABLE IF EXISTS employees;

CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone CHAR(12) NOT NULL,
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT valid_employee_phone CHECK (phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'),
    CONSTRAINT valid_employee_email CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);