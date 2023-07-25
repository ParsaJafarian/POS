DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY,
    price FLOAT NOT NULL DEFAULT 0,
    type VARCHAR(100) NOT NULL,
    size CHAR(3) NOT NULL DEFAULT 'M',
    brand VARCHAR(100),
    transaction_id INT,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    is_final BOOLEAN NOT NULL DEFAULT 0,
    CONSTRAINT valid_price CHECK (price >= 0),
    CONSTRAINT valid_size CHECK (size IN ('XS','S', 'M', 'L', 'XL', 'XXL','3XL')),
    CONSTRAINT valid_type CHECK (type IN ('T-Shirt', 'Polo', 'Sweatshirt', 'Hoodie', 'Jacket', 'Pants', 'Shorts', 'Hat','underwear','Other'))
);

