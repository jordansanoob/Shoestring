const express = require('express');
const path = require('path');

//Init app
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Public folder
app.use(express.static(path.join(__dirname, 'public')));

//Home route
app.get('/', function (req, res) {
    let inventory = [
        {
            name: "Tee-Shirt",
            brand: "Nike",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Hat",
            brand: "Adidas",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Shorts",
            brand: "Reebok",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Pants",
            brand: "Under Armour",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Jacket",
            brand: "Adidas",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Watch",
            brand: "Champion",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Socks",
            brand: "Nike",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Belt",
            brand: "Dickies",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Scarf",
            brand: "N/A",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Jeans",
            brand: "Levi",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Headband",
            brand: "Nike",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        },
        {
            name: "Glasses",
            brand: "Oakley",
            price: (Math.floor(Math.random() * (30 - 10)) + 10)
        }
    ]
    res.render('shopping', {
        name: 'Inventory',
        inventory: inventory
    });
});

//Register page
app.get('/register', function(req, res) {
    res.render('register');
});

//Admin page
app.get('/admin', function (req, res) {
    res.render('admin', {
        admin: 'Jordan'
    });
});


//Start server
app.listen(3000, function () {
    console.log('Server running on port 3000');
});
