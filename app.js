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

    sqlInfo.query('select * from inventory', function (err, data) {
        if (data) {
            data.forEach(function (row) {
                var item = {
                    id: row.itemId,
                    name: row.itemName,
                    brand: row.brandId,
                    price: row.price
                }
                inventory.push(item);
            });
        } else {
            console.log(err);
        }
        res.render('admin', {
            admin: 'Jordan',
            inventory: inventory
        });
    });
});


//Start server
app.listen(3000, function () {
    console.log('Server running on port 3000');
});
