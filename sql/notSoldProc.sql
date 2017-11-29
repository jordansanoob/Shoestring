drop procedure if exists itemsNotSold;
DELIMITER //
CREATE PROCEDURE itemsNotSold()
BEGIN
	SELECT inventory.itemId, 
		   itemName 
	FROM   inventory 
		LEFT JOIN purchased 
	ON purchased.itemId = inventory.itemId 
	WHERE  purchased.itemId IS NULL; 
END //
delimiter ;