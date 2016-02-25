var express = require('express');
var mongoose = require('mongoose');
var app = express();

// mongoose.connect('mongodb://localhost/hackoverflow'); //connect to mongo database

var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/hackoverflow';

var dbURI = 'mongodb://localhost/MongoosePM';

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

// configure our server with all the middleware and routing

// UNCOMMENT TO USE WITH MIDDLEWARE.JS

require('./config/middleware.js')(app, express);

//COMMENT OUT TO USE WITH MIDDLEWARE.JS

// app.use(express.static(__dirname + '/../client'));


var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;


// Comments from Angular Server file.


/* Walkthrough of the server

  Express, mongoose, and our server are initialzed here
  Next, we then inject our server and express into our config/middleware.js file for setup.
    We also exported our server for easy testing

  middleware.js requires all express middleware and sets it up
  our authentication is set up there as well
  we also create individual routers for are two main features, links and users
  each feature has its own folder with a model, controller, and route file
    the respective file is required in middleware.js and injected with its mini router
    that route file then requires the respective controller and sets up all the routes
    that controller then requires the respective model and sets up all our endpoints which respond to requests

*/