drop procedure if exists viewPurchases;
DELIMITER //
CREATE PROCEDURE viewPurchases(IN id varchar(255))
BEGIN
	SELECT itemName, 
       quantity, 
       quantity * price AS totalAmount, 
       purchaseDate, 
       deliveryDate 
	FROM   purchased p, 
       inventory i 
	WHERE  p.itemid = i.itemid 
       AND userId = id;
END //
DELIMITER ;