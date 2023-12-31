DROP TABLE IF EXISTS products;

CREATE TABLE
    IF NOT EXISTS products (
        num INT PRIMARY KEY AUTO_INCREMENT,
        last_trans_num INT,
        price FLOAT NOT NULL DEFAULT 0,
        is_available BOOLEAN NOT NULL DEFAULT 1,
        type VARCHAR(100) NOT NULL,
        size CHAR(3) NOT NULL DEFAULT 'M',
        brand VARCHAR(100),
        FOREIGN KEY (last_trans_num) REFERENCES transactions(num),
        CONSTRAINT valid_price CHECK (price >= 0),
        CONSTRAINT valid_size CHECK (
            size IN (
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
                '3XL'
            )
        ),
        CONSTRAINT valid_type CHECK (
            type IN (
                'T-Shirt',
                'Polo',
                'Sweatshirt',
                'Hoodie',
                'Jacket',
                'Pants',
                'Shorts',
                'Hat',
                'underwear',
                'Other'
            )
        )
    );

ALTER TABLE products AUTO_INCREMENT = 10000000;