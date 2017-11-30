const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//Init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Public folder
app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection(
    {
        host: 'webdev.cislabs.uncw.edu',
        user: 'jha2135',
        password: 'xczcCx3bH',
        database: 'narayan3'
    }
);

connection.connect(function (err) {
    if (err) throw err;
    else {
        console.log("connected");
    }
});

global.db = connection;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6666666 }
}))

//Home route
app.get('/', function (req, res) {
    var inventory = [];
    var user = req.session.user;
    db.query('select * from inventory', function (err, data) {
        if (err) {
            console.log(err)
        } else {
            data.forEach(function (row) {
                var item = {
                    id: row.itemId,
                    name: row.itemName,
                    brand: row.brandId,
                    price: row.price
                }
                inventory.push(item);
            });
        }
        res.render('shopping', {
            name: 'Inventory',
            inventory: inventory,
            activeuser: user
        });
    });
});

//Shopping filter post
app.post('/', function (req, res) {
    var inventory = []
    if (req.body.filter == 'price' || req.body.filter == 'itemName' || req.body.filter == 'departmentId') {
        db.query(`select * from inventory order by ${req.body.filter}`, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                data.forEach(function (row) {
                    var item = {
                        id: row.itemId,
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
    }
    else {
        db.query(`select * from inventory where brandId = '${req.body.brandFilter}'`, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                data.forEach(function (row) {
                    var item = {
                        id: row.itemId,
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
    }
});

//Add to cart page
app.get('/add-to-cart/:id', function (req, res) {
    var userId = req.session.userId;
    var itemId = req.params.id;
    var sql = `call addToCart('${userId}', '${itemId}')`
    db.query(sql, function (err, data) {
        if (err) throw err
        res.redirect('/');
    })
})

//Register page
app.get('/register', function (req, res) {
    res.render('register');
});

//Register post route
app.post('/register', function (req, res) {
    var post = req.body;
    var last = post.inputLastName;
    var first = post.inputFirstName;
    var email = post.inputFirstName;
    var pass = post.inputPassword;
    var user = post.inputUserName;
    var sql = `insert into users(userId, lastName, firstName, userName, userEmail, userPassword)
        values(generateUID(), '${last}', 
        '${first}', '${user}', '${email}', 
        '${pass}')`;

    db.query(sql, (err, data) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

//Login page
app.get('/login', function (req, res) {
    res.render('login');
});

//Login post page
app.post('/login', function (req, res) {
    var post = req.body;
    var name = post.username;
    var pass = post.password;

    var sql = `select userId, firstName, lastName, userName, wallet from users
                where userName = '${name}' and userPassword = '${pass}'
                `
    db.query(sql, function (err, results) {
        if (results.length) {
            req.session.userId = results[0].userId;
            req.session.user = results[0];
            if (results[0].userName == 'admin') {
                res.redirect('/admin');
            } else {
                res.redirect('/');
            }

        } else {
            res.render('register');
        }
    })

});

//Cart route
app.get('/cart/:id', (req, res) => {
    var carts = []
    var purchases = [];
    var userId = req.params.id
    var sql = `select * from cart c join inventory i where c.itemId = i.itemId and c.userId = '${userId}'`;
    db.query(sql, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            data.forEach(function (row) {
                var item = {
                    id: row.itemId,
                    name: row.itemName,
                    qty: row.quantity,
                    price: row.price
                }
                carts.push(item);
            });
            var sql2 = `call viewPurchases('${userId}')`
            db.query(sql2, function (err2, data2) {
                if (err2) throw err
                data2[0].forEach(function (row) {
                    var item = {
                        name: row.itemName,
                        amt: row.totalAmount,
                        pdate: row.purchaseDate,
                        ddate: row.deliverDate
                    }
                    purchases.push(item)
                })
                if (req.session.user) {
                    res.render('cart', {
                        carts: carts,
                        purchases: purchases,
                        activeuser: req.session.user
                    });
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
});

//cart update post
app.post('/cart-update/:id', function (req, res) {
    var id = req.params.id
    var qty = req.body.qty;
    var iid = req.body.iid;
    var sql = `update cart
        set quantity = ${qty}
        where userId = '${id}'
        and itemId = '${iid}'`

    db.query(sql, function (err, data) {
        if (err) throw err
        res.redirect('/cart/' + id);
    });
})

//cart item delete
app.get('/cart-delete/:id', function (req, res) {
    var user = req.session.user
    var itemId = req.params.id

    var sql = `delete from cart where userId = '${user.userId}' and itemId = '${itemId}'`

    db.query(sql, function (err, data) {
        if (err) throw err
        console.log("Deleted: " + itemId);
        res.redirect('/cart/' + user.userId);
    })
});

//cart checkout
app.get('/cart-checkout/:id', function (req, res) {

    var userId = req.params.id

    var sql = `call purchaseCart('${userId}')`;
    db.query(sql, function (err, data) {
        if (err) throw err
        console.log(data);
        res.redirect('/');
    })
})

//Admin page
app.get('/admin', function (req, res) {

    var inventory = [];
    var users = [];
    var orders = [];
    var unsold = [];
    var user = req.session.user;

    // grab the data to populate the inventory array
    db.query('select * from inventory', function (err, data) {
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
        db.query('select * from userAdminView', function (err2, data2) {
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
            db.query('select * from purchased', function (err3, data3) {
                if (err3) throw err3;

                //create an object for each order
                data3.forEach(function (row) {
                    var item = {
                        pid: row.purchaseId,
                        iid: row.itemId,
                        qty: row.quantity,
                        pdate: row.purchaseDate,
                        ddate: row.deliveryDate
                    }
                    orders.push(item);
                });
                var sql4 = `call itemsNotSold()`
                db.query(sql4, function (err4, data4) {
                    if (err4) throw err4
                    data4[0].forEach(function (row) {
                        var item = {
                            name: row.itemName,
                            id: row.itemId
                        }
                        unsold.push(item);
                    });

                    console.log(unsold);
                    if (req.session.user) {
                        console.log(user);
                        if (req.session.user.userName == 'admin') {
                            res.render('admin-content', {
                                inventory: inventory,
                                users: users,
                                orders: orders,
                                unsold: unsold,
                                admin: user
                            });
                        } else {
                            res.render('admin-content', {
                                inventory: inventory,
                                users: users,
                                orders: orders
                            })
                        }

                    } else {
                        res.redirect('/login');
                    }
                })//unsold query end
            }); // purchased query end
        }); // users query end
    }); // inventory query end
}); // admin get end

//chart
app.get('/chart-data', (req, res) => {
    var sql = 'call barchartProc()'
    var sql2 = 'call piechartProc()'
    db.query(sql, function (err, data) {
        db.query(sql2, function (err2, data2) {
            res.send({
                bar: data,
                pie: data2
            })
        })
    })
});

//Add item route
app.get('/inventory/add', (req, res) => {

    if (req.session.user.userName == 'admin') {
        res.render("add-item", { admin: req.session.user });
    } else {
        res.redirect('/login');
    }
});

//Add item post
app.post('/inventory/add', (req, res) => {
    console.log(res.params)
    let sql = `insert into inventory values (generateItemId(),
        '${req.body.name}', 
        ${req.body.price}, 
        '${req.body.dept}',
        '${req.body.brand}')`

    db.query(sql, (err, data) => {
        if (err) throw err
        res.redirect('/admin');
    });

});

//Edit item route
app.get('/inventory/edit/:id', (req, res) => {
    var item;
    let sql = `select * from inventory where itemId = '${req.params.id}'`
    db.query(sql, (err, data) => {
        if (err) throw err

        if (req.session.user.userName == 'admin') {
            res.render("edit-item", {
                title: "Edit Item",
                item: data[0],
                admin: req.session.user
            });
        } else {
            res.redirect('/login');
        }
    });
});

//Update item route
app.post('/inventory/edit/:id', (req, res) => {

    let sql = `update inventory 
                set itemName = '${req.body.name}', 
                brandId = '${req.body.brand}', 
                departmentId = '${req.body.dept}',
                price = ${req.body.price} where itemId = '${req.params.id}'`

    db.query(sql, (err, data) => {
        if (err) throw err
        res.redirect('/admin');
    })
});

//Delete item route
app.get('/inventory/delete/:id', (req, res) => {

    let sql = `delete from inventory where itemId = '${req.params.id}'`

    db.query(sql, (err, data) => {
        if (err) throw err
        console.log("Deleted item: " + req.params.id);
        res.redirect('/admin')
    })
});

//Add user route
app.get('/user/add', (req, res) => {

    if (req.session.user.userName == 'admin') {
        res.render("add-user", { admin: req.session.user });
    } else {
        res.redirect('/login');
    }
});

//Add post user route
app.post('/user/add', (req, res) => {
    console.log(res.params)
    let sql = `insert into users values (generateUID(),
        '${req.body.first}', 
        '${req.body.last}',
        '${req.body.uname}',
        '${req.body.email}',
        generateUID(), 
        ${req.body.wallet})`

    db.query(sql, (err, data) => {
        if (err) throw err
        res.redirect('/admin');
    });
})

//Edit user route
app.get('/user/edit/:id', (req, res) => {

    var user;
    let sql = `select * from users where userId = ${req.params.id}`
    db.query(sql, (err, data) => {
        if (err) throw err;

        if (req.session.user.userName == 'admin') {
            res.render("edit-user", {
                title: "Edit User",
                user: data[0],
                admin: req.session.user
            });
        } else {
            res.redirect('/login')
        }
    })
});

//Update user route
app.post('/user/edit/:id', (req, res) => {

    var sql = `update users 
    set firstName = '${req.body.first}', 
    lastName = '${req.body.last}', 
    wallet = ${req.body.wallet} where userId = '${req.params.id}'`

    db.query(sql, (err, data) => {
        if (err) throw err
        res.redirect('/admin');
    });
});

//Delete User Route
app.get('/user/delete/:id', (req, res) => {

    let sql = `delete from users where userId = '${req.params.id}'`

    db.query(sql, (err, data) => {
        if (err) throw err
        console.log("Deleted user: " + req.params.id);
        res.redirect('/admin')
    });
});

//Edit order route
app.get('/order/edit/:id', (req, res) => {
    var order;

    let sql = `select * from purchased where purchaseId = ${req.params.id}`
    db.query(sql, (err, data) => {
        if (err) throw err

        if (req.session.user.userName == 'admin') {
            res.render('edit-order', {
                order: data[0],
                admin: req.session.user
            })
        } else {
            res.redirect('/login');
        }
    });
});

//Update post order route
app.post('/order/edit/:id', (req, res) => {
    var sql = `update purchased 
    set quantity = '${req.body.qty}', 
    purchaseDate = '${req.body.pdate}', 
    deliveryDate = '${req.body.ddate}' where purchaseId = '${req.params.id}'`;

    console.log(req.body);

    db.query(sql, (err, data) => {
        if (err) throw err
        res.redirect('/admin');
    });
});

//Delete order
app.get('/order/delete/:id', (req, res) => {

    let sql = `delete from purchased where purchaseId = '${req.params.id}'`

    db.query(sql, (err, data) => {
        if (err) throw err
        console.log("Deleted order: " + req.params.id);
        res.redirect('/admin')
    });
});

//Logout Route
app.get('/logout/:id', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect("/login");
    });
});

//Start server
app.listen(3000, function () {
    console.log('Server running on port 3000');
});
