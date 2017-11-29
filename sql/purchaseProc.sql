drop procedure if exists purchaseCart;
DELIMITER //
CREATE PROCEDURE purchaseCart(IN id varchar(255))
BEGIN
	
	DECLARE idItem varchar(255);
	DECLARE qty int;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
		BEGIN
			SELECT "Error: Purchase procedure did not work." AS ERROR;
			ROLLBACK;
		END;

	START TRANSACTION;
	WHILE (SELECT DISTINCT 1 FROM cart WHERE userId = id LIMIT 1) DO
		SET idItem := (SELECT itemId FROM cart WHERE userId=id LIMIT 1);
		SET qty := (SELECT quantity FROM cart WHERE userId=id LIMIT 1);
		INSERT INTO purchased (userId, itemId, quantity, purchaseDate)
					values    (id, idItem, qty, CURDATE());
		DELETE FROM cart WHERE itemId = idItem AND userId = id;
	END WHILE;
	COMMIT;

END //
DELIMITER ;