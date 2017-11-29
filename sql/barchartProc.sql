drop procedure if exists barchartProc;
DELIMITER //
CREATE PROCEDURE barchartProc()
BEGIN
	SELECT itemName, 
	     Sum(quantity) AS amountSold 
	FROM   purchased, 
	     inventory 
	WHERE  purchased.itemid = inventory.itemid 
	GROUP  BY purchased.itemid 
	ORDER  BY amountsold DESC 
	LIMIT  5;
END //
DELIMITER ;