'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var authentication = require('ziplink-passport-authentication');

var indexRoute = require('./routes/index');
var catch404 = require('./routes/catch404');
var errorRoute = require('./routes/error');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/~static', express.static(path.join(__dirname, 'public')));
app.use('/', authentication);
app.use('/', indexRoute);
app.use(catch404);
app.use(errorRoute);

module.exports = app;
