drop procedure if exists addToCart;
DELIMITER //
CREATE PROCEDURE addToCart(IN uId varchar(255), IN iId varchar(255))
BEGIN
	IF (SELECT 1 FROM cart WHERE userId = uid AND itemId = iId > 0) THEN
		UPDATE cart SET quantity = quantity + 1 WHERE userId = uId AND itemId = iId;
	ELSE
		INSERT INTO cart (quantity, userId, itemId) VALUES (1, uId, iId);
	END IF;
END //
DELIMITER ;