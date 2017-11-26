drop function if exists generateUID;
DELIMITER $$
CREATE FUNCTION generateUID() RETURNS varchar(4)
BEGIN
	DECLARE cond INT;
	DECLARE uid INT;
	SET uid := (SELECT FLOOR (RAND()*(9999-1000+1)+1000));
	SET cond := (SELECT 1 FROM users WHERE userid = uid);
	WHILE (cond > 0) DO
		SET uid := (SELECT FLOOR (RAND()*(9999-1000+1)+1000));
		SET cond := (SELECT 1 FROM users WHERE userid = uid);
	END WHILE;
	RETURN CONVERT(uid,char);
END$$
DELIMITER ;