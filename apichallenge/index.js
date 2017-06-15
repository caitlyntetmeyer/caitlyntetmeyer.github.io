/* 
Create a simple Express server - local server (local host) - 
that will allow us to serve up our files and pass data using Http.
---
Serve up dynamic content and pass data (such as a simple form) 
over the web.
*/
var express = require('express');
var app = express();
var http = require('http').Server(app);	

// Tell Node where to find static files in the public directory:
app.use(express.static(__dirname + '/public'));
// Run a function that serves up our index.html file.
// Once our index.html file is served up, the app will run from there:
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
// Set up the server to run on local port 3000:
http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});
// That's all we have to do for now for our simple server!
