delete from users;
delete from department;
delete from brand;
delete from inventory;
delete from cart;
delete from purchased;

insert into users
values(1000, "admin", "admin", "admin@shoestring.com", "password");
insert into users
values(2000, "Sebastian", "Stan", "s.stan@yahoo.com", "sstanpass");
insert into users
values(3000, "Winston", "Devine", "w.devine@gmail.com", "wdevinepass");
insert into users
values(4000, "Francesca", "Wilder", "f.wilder@uncw.edu", "fwilderpass");
insert into users
values(5000, "Jamie", "Lane", "j.lane@aol.com", "jlanepass");
insert into users
values(6000, "Parker", "Cotterfield", "p.cotterfield@bing.com", "pcotterfieldpass");
insert into users
values(7000, "Melissa", "Ferrero", "m.ferrero@gmail.com", "mferreropass");

insert into department
values("MUS", "Music", "Lennon");
insert into department
values("CLO", "Clothing", "Coach");
insert into department
values("BKS", "Books", "Fitzgerald");
insert into department
values("ELE", "Electronics", "Tesla");
insert into department
values("HME", "Home/Kitchen", "Pilgrim");
insert into department
values("ATO", "Automobile", "Ford");

insert into brand
values("NIKE", "Nike", "999 Highpoint Dr.", "555-555-5555", "John", "Jones");
insert into brand
values("ADID", "Adidas", "384 Anchor Pl.", "154-658-9998", "Cathy", "Hunter");
insert into brand
values("FARB", "Farberware", "293 Indian Summer Ct.", "652-873-1545", "Edna", "Walkerfield");
insert into brand
values("HLGR", "Tommy Hilfiger", "500 Passport Rd.", "960-327-8136", "Tommy", "Hilfiger");
insert into brand
values("SONY", "Sony", "739 Lasso Ln.", "671-118-4843", "Cooper", "Bannon");
insert into brand
values("TSBA", "Toshiba", "88 Bobblehead Dr.", "561-284-9989", "Stevia", "Cooks");
insert into brand
values("PTGA", "Patagonia", "293 Ironsleeve Ct.", "654-946-3333", "Marcus", "Vez");

insert into inventory
values("NS-8945", "Men's Nike Shoes", 64.99, "0", "CLO", "NIKE");
insert into inventory
values("NS-8345", "Women's Nike Shoes ", 34.99, "1", "CLO", "NIKE");
insert into inventory
values("NS-7365", "Kid's Nike Shoes", 59.99, "0", "CLO", "NIKE");
insert into inventory
values("FB-2839", "Fiction Book", 12.99, null, "BKS", null);
insert into inventory
values("NB-2229", "Non-fiction Book", 9.99, null, "BKS", null);
insert into inventory
values("MB-2589", "Mystery Book", 14.99, null, "BKS", null);
insert into inventory
values("OJ-9384", "Outdoor Jacket", 129.99, "1", "CLO", "PTGA");
insert into inventory
values("OH-9234", "Outdoor Hat", 24.99, "0", "CLO", "PTGA");
insert into inventory
values("OP-9384", "Outdoor Pants", 79.99, "1", "CLO", "PTGA");
insert into inventory
values("AS-9003", "Adidas Socks 3-pack", 12.99, "0", "CLO", "ADID");
insert into inventory
values("A2-9023", "Adidas Socks 3-pack", 12.99, "1", "CLO", "ADID");
insert into inventory
values("AT-9293", "Adidas T-Shirt", 29.99, "0", "CLO", "ADID");
insert into inventory
values("KB-3293", "Knife Block", 69.99, null, "HME", "FARB");
insert into inventory
values("CB-1193", "Cutting Board", 9.99, null, "HME", "FARB");
insert into inventory
values("SS-3993", "Spatula Set", 19.99, null, "HME", "FARB");
insert into inventory
values("TV-9009", "Sony Television", 349.99, null, "ELE", "SONY");
insert into inventory
values("SB-9088", "Sound Bar", 139.99, null, "ELE", "SONY");
insert into inventory
values("PS-0004", "Playstation 4", 399.99, null, "ELE", "SONY");
insert into inventory
values("HP-1138", "Headphones", 49.99, null, "ELE", "TSBA");
insert into inventory
values("HS-2938", "Home Speakers", 99.99, null, "ELE", "TSBA");
insert into inventory
values("RC-2001", "Remote Control", 14.99, null, "ELE", "TSBA");
insert into inventory
values("HJ-2039", "Hilfiger Jeans", 59.99, "0", "CLO", "HLGR");
insert into inventory
values("WH-9939", "Winter Hat", 59.99, "0", "CLO", "HLGR");
insert into inventory
values("HB-1024", "Hilfiger Belt", 18.99, "0", "CLO", "HLGR");
