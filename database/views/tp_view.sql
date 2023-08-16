DROP VIEW IF EXISTS tp_view;

CREATE VIEW tp_view AS
SELECT
    tp.trans_num,
    tp.last_trans_num,
    transactions.employee_num,
    last_transactions.employee_num AS last_employee_num,
    DATE_FORMAT(transactions.date, '%d-%m-%Y') AS date,
    COALESCE(amount_bought, 0) AS amount_bought,
    COALESCE(amount_returned, 0) AS amount_returned,
    COALESCE(amount_bought, 0) - COALESCE(amount_returned, 0) AS total
FROM tp
    LEFT JOIN transactions ON transactions.num = tp.trans_num
    LEFT JOIN products ON products.num = tp.product_num
    LEFT JOIN transactions AS last_transactions ON last_transactions.num = tp.last_trans_num
    LEFT JOIN (
        SELECT
            trans_num,
            SUM(price) AS amount_bought
        FROM tp
            JOIN transactions ON transactions.num = tp.trans_num
            JOIN products ON products.num = tp.product_num
        WHERE tp.is_return = 1
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
        WHERE tp.is_return = 0
        GROUP BY
            trans_num
    ) AS bought ON bought.trans_num = tp.trans_num
GROUP BY
    tp.trans_num,
    tp.last_trans_num
ORDER BY tp.trans_num DESC;