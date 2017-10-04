use jha2135;

drop table IF EXISTS users;
drop table IF EXISTS inventory;
drop table if exists cart;
drop table if exists purchased;
drop table if exists brand;
drop table if exists department;



CREATE TABLE users (
					userId INT NOT NULL,
					lastName varchar(255) NOT NULL,
					firstName varchar(255) NOT NULL,
					email varchar(320) NOT NULL,
					password varchar(64) NOT NULL,
					PRIMARY KEY (userId)
)ENGINE=INNODB;

CREATE TABLE department (
					departmentId INT NOT NULL,
					departmentName varchar(48) NOT NULL,
					departmentManager varchar(48) NOT NULL,
					PRIMARY KEY (departmentId)
) ENGINE=INNODB;

CREATE TABLE brand (
					brandId INT NOT NULL,
					address varchar(64) NOT NULL,
					phoneNumber INT NOT NULL,
					repFirstName varchar(16) NOT NULL,
					repLastName varchar(16) NOT NULL,
					PRIMARY KEY (brandId)
) ENGINE=INNODB;

CREATE TABLE inventory (
					itemId INT NOT NULL,
					price DECIMAL(19,4) NOT NULL,
					gender VARCHAR(1),
					departmentId INT NOT NULL,
					brandId INT NOT NULL,
					PRIMARY KEY (itemId),
					FOREIGN KEY (departmentId) references department(departmentId),
					FOREIGN KEY (brandId) references brand(brandId)
)ENGINE=INNODB;

CREATE TABLE cart (
					cartId INT NOT NULL,
					quantity INT NOT NULL,
					userId INT NOT NULL,
					itemId INT NOT NULL,
					PRIMARY KEY (cartId),
					FOREIGN KEY (userId) REFERENCES users(userId),
					FOREIGN KEY (itemId) REFERENCES inventory(itemId)
) ENGINE=INNODB;

CREATE TABLE purchased (
					purchaseId INT NOT NULL,
					userId INT NOT NULL,
					itemId INT NOT NULL,
					quantity INT NOT NULL,
					purchaseDate date NOT NULL,
					deliveryDate date NOT NULL,
					PRIMARY KEY (purchaseId),
					FOREIGN KEY (userId) REFERENCES users(userId),
					FOREIGN KEY (itemId) REFERENCES inventory(itemId)
					
) ENGINE=INNODB;



