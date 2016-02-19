var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

// Gonna change this at some point.

app.use(express.static(__dirname + '/../client'));

app.listen(port);

module.exports = app;
