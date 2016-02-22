var express = require('express');
var mongoose = require('mongoose');
var app = express();

// build the connection strings for heroku and localhost
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/hackOverflow';

var dbURI = 'mongodb://localhost/MongoosePM';

//create the db connection
mongoose.connect(dbURI);
/* ===============================================
	DB Event Handlers
   ===============================================
*/  

// logs a connection 	
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});
// logs when disconnected
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

// logs when user terminates app
process.on('SIGINIT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through app termination');
		process.exit(0);
	});
});

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));

app.listen(port);

module.exports = app;
