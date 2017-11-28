drop procedure if exists deleteUser;

DELIMITER //

CREATE PROCEDURE deleteUser(IN id varchar(255))
	BEGIN
	DELETE FROM users 
	WHERE userId = id;
END //

DELIMITER ;