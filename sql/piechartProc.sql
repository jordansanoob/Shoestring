drop procedure if exists piechartProc;
DELIMITER //
CREATE PROCEDURE piechartProc()
BEGIN
	SELECT itemname, 
	     ( SUM(quantity) / (SELECT SUM(quantity) 
	                        FROM   purchased) ) AS amountSold 
	FROM   purchased, 
	     inventory 
	WHERE  purchased.itemid = inventory.itemid 
	GROUP  BY purchased.itemid 
	ORDER  BY amountsold DESC;
END //
DELIMITER ;
