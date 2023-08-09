USE hbc;

-- Find the last transaction for each product
SELECT
    product_num,
    MAX(trans_num) AS last_trans_num
FROM transaction_products
GROUP BY product_num
ORDER BY last_trans_num DESC;