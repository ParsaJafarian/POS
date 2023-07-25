CREATE DATABASE IF NOT EXISTS hbc;

USE hbc;

SET @path = "C:\Users\Admin\Desktop\LaBaie\database\tables\";

SOURCE @path\customers.sql;
SOURCE @path\discounts.sql;
SOURCE @path\employees.sql;
SOURCE @path\transactions.sql;
SOURCE @path\products.sql;

