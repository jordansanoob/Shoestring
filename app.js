const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

//Init app
const app = express();

//Init bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post('/register', function (req, res) {
    console.log(JSON.stringify(req.body.inputFirstName));
    sqlInfo.query('insert into users ');
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


//Add item route
app.get('/item/add', function (req, res) {
    res.render("add-item");
});


//Edit item route
app.get('/inventory/edit/:id', function (req, res) {
    var item;
    let sql = `select * from inventory where itemId = '${req.params.id}'`
    console.log(req.body);
    sqlInfo.query(sql, (err, data) => {
        if (err) throw err
        res.render("edit-item", {
            title: "Edit Item",
            item: data[0]
        });
    })
});

//Update item route
app.post('/inventory/edit/:id', (req, res) => {
    res.send(
        req.body
    )
});





//Add user route
app.get('/user/add', function (req, res) {
    res.render("add-user");
});

//Edit user route
app.get('/user/edit/:id', (req, res) => {

    var user;
    let sql = `select * from users where userId = ${req.params.id}`
    sqlInfo.query(sql, (err, data) => {
        res.render("edit-user", {
            title: "Edit User",
            user: data[0]
        });
    })

});



//Edit order route
app.get('/order/edit/:id', function (req, res) {
    var order;
    let sql = `select * from purchased where purchaseId = ${req.params.id}`

    sqlInfo.query(sql, (err, data) => {
        if (err) throw err
        console.log(data);
        res.render('edit-order', {
            order: data[0]
        })
    });
});

//Start server
app.listen(3000, function () {
    console.log('Server running on port 3000');
});
