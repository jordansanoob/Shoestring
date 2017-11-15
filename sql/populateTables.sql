delete from users;
delete from department;
delete from brand;
delete from inventory;
delete from cart;
delete from purchased;

insert into users (userId, lastName, firstName, userEmail, userPassword)
values  ('1000', "admin", "admin", "admin@shoestring.com", "password"),
        ('2000', "Sebastian", "Stan", "s.stan@yahoo.com", "sstanpass"),
        ('3000', "Winston", "Devine", "w.devine@gmail.com", "wdevinepass"),
        ('4000', "Francesca", "Wilder", "f.wilder@uncw.edu", "fwilderpass"),
        ('5000', "Jamie", "Lane", "j.lane@aol.com", "jlanepass"),
        ('6000', "Parker", "Cotterfield", "p.cotterfield@bing.com", "pcotterfieldpass"),
        ('7000', "Melissa", "Ferrero", "m.ferrero@gmail.com", "mferreropass");

insert into department
values  ("MUS", "Music", "Lennon"),
        ("CLO", "Clothing", "Coach"),
        ("BKS", "Books", "Fitzgerald"),
        ("ELE", "Electronics", "Tesla"),
        ("HME", "Home/Kitchen", "Pilgrim"),
        ("ATO", "Automobile", "Ford");

insert into brand
values  ("NIKE", "Nike", "999 Highpoint Dr.", "555-555-5555", "John", "Jones"),
        ("ADID", "Adidas", "384 Anchor Pl.", "154-658-9998", "Cathy", "Hunter"),
        ("FARB", "Farberware", "293 Indian Summer Ct.", "652-873-1545", "Edna", "Walkerfield"),
        ("HLGR", "Tommy Hilfiger", "500 Passport Rd.", "960-327-8136", "Tommy", "Hilfiger"),
        ("SONY", "Sony", "739 Lasso Ln.", "671-118-4843", "Cooper", "Bannon"),
        ("TSBA", "Toshiba", "88 Bobblehead Dr.", "561-284-9989", "Stevia", "Cooks"),
        ("PTGA", "Patagonia", "293 Ironsleeve Ct.", "654-946-3333", "Marcus", "Vez");

insert into inventory
values  ("NS-8945", "Men's Nike Shoes", 64.99, "0", "CLO", "NIKE"),
        ("NS-8345", "Women's Nike Shoes ", 34.99, "1", "CLO", "NIKE"),
        ("NS-7365", "Kid's Nike Shoes", 59.99, "0", "CLO", "NIKE"),
        ("FB-2839", "Fiction Book", 12.99, null, "BKS", null),
        ("NB-2229", "Non-fiction Book", 9.99, null, "BKS", null),
        ("MB-2589", "Mystery Book", 14.99, null, "BKS", null),
        ("OJ-9384", "Outdoor Jacket", 129.99, "1", "CLO", "PTGA"),
        ("OH-9234", "Outdoor Hat", 24.99, "0", "CLO", "PTGA"),
        ("OP-9384", "Outdoor Pants", 79.99, "1", "CLO", "PTGA"),
        ("AS-9003", "Adidas Socks 3-pack", 12.99, "0", "CLO", "ADID"),
        ("A2-9023", "Adidas Socks 3-pack", 12.99, "1", "CLO", "ADID"),
        ("AT-9293", "Adidas T-Shirt", 29.99, "0", "CLO", "ADID"),
        ("KB-3293", "Knife Block", 69.99, null, "HME", "FARB"),
        ("CB-1193", "Cutting Board", 9.99, null, "HME", "FARB"),
        ("SS-3993", "Spatula Set", 19.99, null, "HME", "FARB"),
        ("TV-9009", "Sony Television", 349.99, null, "ELE", "SONY"),
        ("SB-9088", "Sound Bar", 139.99, null, "ELE", "SONY"),
        ("PS-0004", "Playstation 4", 399.99, null, "ELE", "SONY"),
        ("HP-1138", "Headphones", 49.99, null, "ELE", "TSBA"),
        ("HS-2938", "Home Speakers", 99.99, null, "ELE", "TSBA"),
        ("RC-2001", "Remote Control", 14.99, null, "ELE", "TSBA"),
        ("HJ-2039", "Hilfiger Jeans", 59.99, "0", "CLO", "HLGR"),
        ("WH-9939", "Winter Hat", 59.99, "0", "CLO", "HLGR"),
        ("HB-1024", "Hilfiger Belt", 18.99, "0", "CLO", "HLGR");

insert into cart(quantity, userId, itemId)
values  (1, 2000, "RC-2001"), 
        (1, 6000, "HP-1138"),
        (1, 4000, "NS-8345"),
        (1, 2000, "SS-3993"),
        (1, 3000, "HP-1138"),
        (1, 3000, "SB-9088"),
        (1, 5000, "SS-3993"),
        (1, 6000, "HP-1138"),
        (1, 1000, "HP-1138"),
        (1, 1000, "NS-8345"),
        (1, 1000, "TV-9009"),
        (1, 2000, "FB-2839"),
        (1, 4000, "OH-9234"),
        (1, 7000, "FB-2839"),
        (1, 7000, "SS-3993"),
        (1, 5000, "HP-1138"),
        (1, 5000, "NS-8345"),
        (1, 6000, "OH-9234");

insert into purchased (userId, itemId, quantity, purchaseDate, deliveryDate)
values  (3000, "MB-2589", 4, "11-08-2015", "11-11-2015"),
        (6000, "KB-3293", 5, "08-06-2016", "08-09-2016"),
        (4000, "SB-9088", 2, "07-20-2014", "07-23-2014"),
        (7000, "PS-0004", 3, "03-26-2017", "03-29-2017"),
        (5000, "NB-2229", 3, "01-22-2014", "01-25-2014"),
        (2000, "SS-3993", 4, "03-26-2016", "03-29-2016"),
        (7000, "HP-1138", 1, "06-06-2017", "06-09-2017"),
        (3000, "RC-2001", 3, "10-17-2015", "10-20-2015"),
        (3000, "HP-1138", 5, "10-08-2016", "10-11-2016"),
        (4000, "CB-1193", 4, "11-14-2014", "11-17-2014"),
        (3000, "HJ-2039", 2, "06-04-2017", "06-07-2017"),
        (3000, "FB-2839", 4, "01-12-2016", "01-15-2016"),
        (1000, "OP-9384", 2, "10-06-2015", "10-09-2015"),
        (3000, "TV-9009", 2, "07-10-2014", "07-13-2014"),
        (2000, "WH-9939", 3, "03-03-2014", "03-06-2014"),
        (4000, "SB-9088", 1, "12-12-2017", "12-15-2017"),
        (5000, "RC-2001", 2, "04-25-2015", "04-28-2015"),
        (2000, "OP-9384", 3, "03-01-2015", "03-04-2015"),
        (4000, "KB-3293", 3, "02-04-2015", "02-07-2015"),
        (2000, "NS-7365", 2, "02-15-2016", "02-18-2016"),
        (3000, "NB-2229", 4, "12-05-2017", "12-08-2017"),
        (6000, "SS-3993", 3, "11-13-2015", "11-16-2015"),
        (3000, "NS-7365", 4, "08-13-2016", "08-16-2016"),
        (4000, "FB-2839", 1, "08-20-2015", "08-23-2015"),
        (5000, "HS-2938", 3, "10-12-2015", "10-15-2015");