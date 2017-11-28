drop view if exists userAdminView;

CREATE VIEW userAdminView
AS
	SELECT userId,
		   firstName,
		   lastName,
		   wallet
	FROM   users;
