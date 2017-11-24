const express = require('express');
const mysql = require('mysql');
const path = require('path');

//Init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Public folder
app.use(express.static(path.join(__dirname, 'public')));

var sqlInfo = mysql.createConnection({
    host: 'webdev.cislabs.uncw.edu',
    user: 'jha2135',
    password: 'xczcCx3bH',
    database: 'narayan3'
});

sqlInfo.connect(function (err) {
    if (err) throw err;
    else {
        console.log("connected");
    }
});

//Home route
app.get('/', function (req, res) {
    var inventory = [];
    sqlInfo.query('select * from inventory', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            data.forEach(function (row) {
                var item = {
                    name: row.itemName,
                    brand: row.brandId,
                    price: row.price
                }
                inventory.push(item);
            });
        }
        res.render('shopping', {
            name: 'Inventory',
            inventory: inventory
        });
    });

});

//Register page
app.get('/register', function (req, res) {
    res.render('register');
});

//Login page
app.get('/login', function (req, res) {
    res.render('userLogin');
});

//Admin page
app.get('/admin', function (req, res) {

    var inventory = [];
    var users = [];
    var orders = [];

    // grab the data to populate the inventory array
    sqlInfo.query('select * from inventory', function (err, data) {
        if (err) throw err;

        // create an object for each item in inventory
        data.forEach(function (row) {
            var item = {
                id: row.itemId,
                name: row.itemName,
                brand: row.brandId,
                price: row.price
            }
            inventory.push(item);
        });

        // grab the data to populate the users array
        sqlInfo.query('select * from users', function (err2, data2) {
            if (err2) throw err2;

            //create an object for each user
            data2.forEach(function (row) {
                var item = {
                    id: row.userId,
                    first: row.firstName,
                    last: row.lastName,
                    wallet: row.wallet
                }
                users.push(item);
            });

            // grab the data to populate the orders array
            sqlInfo.query('select * from purchased', function (err3, data3) {
                if (err3) throw err3;

                //create an object for each order
                data3.forEach(function (row) {
                    var item = {
                        id: row.purchaseId,
                        name: row.itemId,
                        qty: row.quantity,
                        pdate: row.purchaseDate
                    }
                    orders.push(item);
                });
                res.render('admin-content', {
                    admin: 'Jordan',
                    inventory: inventory,
                    users: users,
                    orders: orders
                });
            }); // purchased query end
        }); // users query end
    }); // inventory query end
}); // admin get end

//Add user route
app.get('/user/add', function (req, res) {
    res.render("add-user");
});

//Add user route
app.get('/item/add', function (req, res) {
    res.render("add-item");
});

//Add user route
app.get('/order/add', function (req, res) {
    res.render("add-order");
});

//Edit user route
app.get('/user/edit/:id', function (req, res) {
    var user;
    res.render("edit-user", {
        title: "Edit User",
        user: user
    });
});

//Edit item route
app.get('/inventory/edit/:id', function (req, res) {
    var item;
    res.render("edit-item", {
        title: "Edit Item",
        item: item
    });
});

//Edit order route
app.get('/order/edit/:id', function (req, res) {
    var order;
    res.render("edit-order", {
        title: "Edit order",
        order: order
    });
});

//Start server
app.listen(3000, function () {
    console.log('Server running on port 3000');
});
