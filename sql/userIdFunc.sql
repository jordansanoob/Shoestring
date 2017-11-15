drop function if exists generateUID;
DELIMITER $$
CREATE FUNCTION generateUID(first varchar(255), last varchar(255)) RETURNS INT
BEGIN
	DECLARE uid varchar(255);
	DECLARE cond INT;
	SET uid = CAST((SELECT FLOOR (RAND()*(9999-1000+1)+1000)) AS char(255));
	SET cond = (SELECT 1 FROM users WHERE userid = uid);
	WHILE (cond > 0) DO
		SET uid = CAST(SELECT FLOOR (RAND()*(9999-1000+1))+1000 AS char(255));
		SET cond = SELECT 1 FROM users WHERE userid = uid;
	END WHILE;
END$$
DELIMITER ;