drop function if exists generateItemID;
DELIMITER $$
CREATE FUNCTION generateItemID() RETURNS varchar(4)
BEGIN
	DECLARE cond INT;
	DECLARE id INT;
	SET id := (SELECT FLOOR (RAND()*(9999-1000+1)+1000));
	SET cond := (SELECT 1 FROM inventory WHERE itemId = id);
	WHILE (cond > 0) DO
		SET id := (SELECT FLOOR (RAND()*(9999-1000+1)+1000));
		SET cond := (SELECT 1 FROM inventory WHERE itemId = id);
	END WHILE;
	RETURN CONVERT(id,char);
END$$
DELIMITER ;