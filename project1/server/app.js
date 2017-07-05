require('dotenv').config();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// Import the server > db.js module:
var sequelize = require('./db');

// Import sequelize, as well as server > models > user.js:
var User = sequelize.import('./models/user');

// mongo setup:
var mongoose = require('mongoose');
var mongodb = require('./db_mongo');
var Account = require('./models_mongo/user')(mongoose);
var Product = require('./models_mongo/products.js')(mongoose);

mongoose.connect(mongodb.databaseUrl);
// connects our db to our application
// mongodb is a variable from above.

mongoose.connection.on('connected', function(){
	console.log('connected to db ' + mongodb.databaseUrl)
})
// "Once you've connected to the db, print the database URL." 

// end mongo setup

sequelize.sync();

// Tell the application to use bodyParser:
app.use(bodyParser.json());
/*
bodyParser will parse data off incoming requests and turn the data into
JSON. bodyParser will take that JSON & expose it to be used for
req.body.
*/

// Import middleware > headers.js:
app.use(require('./middleware/headers'));

// Import middleware > validate-session.js:
app.use(require('./middleware/validate-session'));

// Tell express to use routes > user.js as a route:
// app.use('/api/user', require('./routes/user'));

// Creating a user
app.post('/api/user', function(req, res){
	var username = req.body.user.username;
	var pass = req.body.user.password;

	Account.register(username, pass);
	// Account is a variable from above.
	res.send(200);
	// Once the data has been saved, send an "OK" message.
})

// products route:
app.post('/api/products', function(req, res){
	var name = req.body.product.name;
	var description = req.body.product.description;
	var image = req.body.product.image;
	var price = req.body.product.price;
	console.log(req.body);
	Product.createProduct(name, description, image, price);
	res.send(200);
})

// login route:
app.use('/api/login', require('./routes/session'));
// localhost:3000/api/login

// definition route:POST
app.use('/api/definition', require('./routes/definition'));

app.use('/api/log', require('./routes/log'));

app.use('/api/test', function(req, res) {
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("App is listening on 3000.");
});
