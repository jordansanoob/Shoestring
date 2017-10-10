/* A query to find items of a certain gender and of a certain brand.
   Replace brand name with the desired brand and gender with the desired gender*/

SELECT *
FROM inventory
WHERE gender = 0
  AND brandId =
    (SELECT brandId
     FROM brand
     WHERE brandName = 'Adidas');

/* Order items by most popular. */

SELECT itemName,
       sum(quantity) AS amountSold
FROM purchased,
     inventory
WHERE purchased.itemId = inventory.itemId
GROUP BY itemName
ORDER BY amountSold DESC;

/* Allow a user to view the items in their cart. */

CREATE VIEW cartView AS
SELECT itemName,
       cart.quantity,
       inventory.price*cart.quantity AS amount
FROM cart,
     inventory
WHERE cart.itemId = inventory.itemId
  AND userId = 2000;