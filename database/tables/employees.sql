USE labaie_db;

DROP TABLE IF EXISTS employees;

CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone CHAR(12) NOT NULL
);