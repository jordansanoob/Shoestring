CREATE VIEW piechart 
AS 
  SELECT itemname, 
         ( SUM(quantity) / (SELECT SUM(quantity) 
                            FROM   purchased) ) AS amountSold 
  FROM   purchased, 
         inventory 
  WHERE  purchased.itemid = inventory.itemid 
  GROUP  BY purchased.itemid 
  ORDER  BY amountsold DESC; 