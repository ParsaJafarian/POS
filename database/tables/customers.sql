USE labaie_db;

DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone CHAR(12) NOT NULL,
    email VARCHAR(100)
);