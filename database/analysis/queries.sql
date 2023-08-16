SELECT
    trans_num AS num,
    DATE_FORMAT(date, '%d-%m-%Y') AS date,
    SUM(price) AS total
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num
WHERE employee_num = 21252044
GROUP BY num;

SELECT
    trans_num,
    product_num,
    employee_num,
    DATE_FORMAT(date, '%d-%m-%Y') AS date,
    price,
    is_available,
    last_trans_num
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num;

SELECT *
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num;

SELECT
    products.num AS product_num,
    last_trans_num,
    employees.num AS last_employee_num
FROM products
    JOIN transactions ON products.last_trans_num = transactions.num
    JOIN employees ON transactions.employee_num = employees.num;



SELECT
    trans_num,
    SUM(price) AS amount_bought
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num
WHERE is_available = 0
GROUP BY trans_num;

SELECT
    trans_num,
    SUM(price) AS amount_returned
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num
WHERE is_available = 1
GROUP BY trans_num;

SELECT
    tp.trans_num,
    product_num,
    employee_num,
    DATE_FORMAT(date, '%d-%m-%Y') AS date,
    price,
    is_available,
    last_trans_num,
    COALESCE(amount_bought, 0) AS amount_bought,
    COALESCE(amount_returned, 0) AS amount_returned
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num
    LEFT JOIN (
        SELECT
            trans_num,
            SUM(price) AS amount_bought
        FROM tp
            JOIN transactions ON transactions.num = tp.trans_num
            JOIN products ON products.num = tp.product_num
        WHERE is_available = 0
        GROUP BY
            trans_num
    ) AS returned ON returned.trans_num = tp.trans_num
    LEFT JOIN (
        SELECT
            trans_num,
            SUM(price) AS amount_returned
        FROM tp
            JOIN transactions ON transactions.num = tp.trans_num
            JOIN products ON products.num = tp.product_num
        WHERE is_available = 1
        GROUP BY
            trans_num
    ) AS bought ON bought.trans_num = tp.trans_num;

SELECT
    tp.trans_num,
    employee_num,
    DATE_FORMAT(date, '%d-%m-%Y') AS date,
    COALESCE(amount_bought, 0) AS amount_bought,
    COALESCE(amount_returned, 0) AS amount_returned
FROM tp
    JOIN transactions ON transactions.num = tp.trans_num
    JOIN products ON products.num = tp.product_num
    LEFT JOIN (
        SELECT
            trans_num,
            SUM(price) AS amount_bought
        FROM tp
            JOIN transactions ON transactions.num = tp.trans_num
            JOIN products ON products.num = tp.product_num
        WHERE is_available = 0
        GROUP BY
            trans_num
    ) AS returned ON returned.trans_num = tp.trans_num
    LEFT JOIN (
        SELECT
            trans_num,
            SUM(price) AS amount_returned
        FROM tp
            JOIN transactions ON transactions.num = tp.trans_num
            JOIN products ON products.num = tp.product_num
        WHERE is_available = 1
        GROUP BY
            trans_num
    ) AS bought ON bought.trans_num = tp.trans_num
GROUP BY tp.trans_num;

SELECT
    products.num AS product_num,
    trans_num,
    last_trans_num,
    employees.num AS last_employee_num
FROM products
    JOIN transactions AS last_transactions ON products.last_trans_num = last_transactions.num
    JOIN employees ON last_transactions.employee_num = employees.num
    JOIN tp ON products.num = tp.product_num
    JOIN transactions ON tp.trans_num = transactions.num;