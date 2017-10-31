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

/* Update itemId in cart if inventory price changes.
   Might be easier to use ON UPDATE CASCADE */

delimiter //

CREATE TRIGGER cartItemIdUpdate AFTER UPDATE ON inventory
FOR EACH ROW
	BEGIN
		IF OLD.itemId <> NEW.itemId THEN
			UPDATE cart
			SET cart.itemId = NEW.itemId;
		END IF;
	END;
//

delimiter ;

/* Find products under a certain price and from a certain brand. */

SELECT itemname, 
       gender, 
       inventory.price 
FROM   inventory 
WHERE  price < 20 
       AND brandid = (SELECT brandid 
                      FROM   brand 
                      WHERE  brandname = 'Adidas');

/* Find out how much each user has spent at Shoestring. */

SELECT t.useremail, 
       Sum(totalp) AS amountSpent 
FROM   (SELECT u.useremail, 
               i.itemname, 
               p.quantity, 
               p.quantity * price AS totalP 
        FROM   purchased p, 
               users u, 
               inventory i 
        WHERE  p.userid = u.userid 
               AND i.itemid = p.itemid) AS t 
GROUP  BY useremail; 

/* Order brands by most popular. */	 
	 
SELECT brandId,
       sum(quantity) AS amountSold
FROM purchased,
     inventory
WHERE purchased.itemId = inventory.itemId
GROUP BY brandId
ORDER BY amountSold DESC;

/* Order emails of users who have purchased products, and how many products they've purchased. */	 
	 
SELECT userEmail, sum(quantity) AS amountPurchased
FROM users u, purchased p
WHERE p.UserId = u.UserId 
GROUP BY userEmail
ORDER BY quantity;

/* Order departments by sales. */

SELECT departmentName, d.departmentId, sum(quantity) AS amountSold 
FROM department d, inventory i, purchased p 
WHERE p.itemId = i.itemId 
AND i.departmentId = d.departmentId
GROUP BY d.departmentName 
ORDER BY sum(quantity) DESC;

/* Total profits */

SELECT sum(quantity * price) AS profit
FROM inventory i, purchased p 
WHERE i.itemId = p.itemId;
