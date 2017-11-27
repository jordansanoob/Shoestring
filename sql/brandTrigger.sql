DROP TRIGGER IF EXISTS brandRemovalTrigger;

DELIMITER $$

CREATE TRIGGER brandRemovalTrigger BEFORE DELETE ON brand 
FOR EACH ROW
    BEGIN
        UPDATE inventory
        SET    inventory.brandId = 'N/A'
        WHERE  inventory.brandId = OLD.brandId;
    END;
$$

delimiter ;
