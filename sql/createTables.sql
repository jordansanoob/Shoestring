drop table purchased;
drop table cart;
drop table inventory;
drop table users;
drop table department;
drop table brand;

CREATE TABLE users
(
	userId varchar(255) NOT NULL,
	lastName varchar(255) NOT NULL,
	firstName varchar(255) NOT NULL,
	userName varchar(255) NOT NULL,
	userEmail varchar(320) NOT NULL,
	userPassword varchar(64) NOT NULL,
	wallet decimal(19,4) NOT NULL DEFAULT 50,
	PRIMARY KEY (userId)
)
ENGINE=INNODB;

CREATE TABLE department
(
	departmentId varchar(3) NOT NULL,
	departmentName varchar(48) NOT NULL,
	departmentManager varchar(48) NOT NULL,
	PRIMARY KEY (departmentId)
)
ENGINE=INNODB;

CREATE TABLE brand
(
	brandId varchar(4) NOT NULL,
	brandName varchar(255) not null,
	brandAddress varchar(64) NOT NULL,
	phoneNumber varchar(12),
	repFirstName varchar(16) NOT NULL,
	repLastName varchar(16) NOT NULL,
	PRIMARY KEY (brandId)
)
ENGINE=INNODB;

CREATE TABLE inventory
(
	itemId varchar(7) NOT NULL,
	itemName varchar(32) NOT NULL,
	price DECIMAL(19,4) NOT NULL,
	departmentId varchar(3) NOT NULL,
	brandId varchar(4),
	PRIMARY KEY (itemId),
	FOREIGN KEY (departmentId) references department(departmentId),
	FOREIGN KEY (brandId) references brand(brandId)
)
ENGINE=INNODB;

CREATE TABLE cart
(
	entryNumber INT NOT NULL AUTO_INCREMENT,
	quantity INT NOT NULL,
	userId varchar(255) NOT NULL,
	itemId varchar(7) NOT NULL,
	PRIMARY KEY (entryNumber),
	FOREIGN KEY (userId) REFERENCES users(userId)
	ON DELETE CASCADE,
	FOREIGN KEY (itemId) REFERENCES inventory(itemId)
	ON DELETE CASCADE
)
ENGINE=INNODB;

CREATE TABLE purchased
(
	purchaseId INT NOT NULL AUTO_INCREMENT,
	userId varchar(255) NOT NULL,
	itemId varchar(7) NOT NULL,
	quantity INT NOT NULL,
	purchaseDate DATE NOT NULL,
	deliveryDate DATE,
	PRIMARY KEY (purchaseId),
	FOREIGN KEY (userId) REFERENCES users(userId)
	ON DELETE CASCADE,
	FOREIGN KEY (itemId) REFERENCES inventory(itemId)
	ON DELETE CASCADE

)
ENGINE=INNODB;



