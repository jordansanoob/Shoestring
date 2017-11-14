DELIMITER $$
CREATE FUNCTION generateUID(first varchar(255), last varchar(255)) RETURNS INT
BEGIN
	DECLARE uid varchar(255);
	SET uid = CAST(RAND()*(9999-1000)+1000 AS char);
	WHILE SELECT 1 FROM users WHERE userid = uid < 1 DO
		SET uid = CAST(RAND()*(9999-1000)+1000 AS char);
	END WHILE;
END$$
DELIMITER ;