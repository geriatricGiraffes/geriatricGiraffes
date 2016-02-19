var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/../client'));

app.listen(port);

module.exports = app;
