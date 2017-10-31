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
            price: 10
        },
        {
            name: "Hat",
            brand: "Adidas",
            price: 20
        },
        {
            name: "Shorts",
            brand: "Reebok",
            price: 15
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
