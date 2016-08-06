'use strict';
var log = require('ziplink-logger');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var authentication = require('ziplink-passport-authentication');

var indexRoute = require('./routes/index');
var catch404 = require('./routes/catch404');
var errorRoute = require('./routes/error');

var app = express();
log.trace('Created express app');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
log.trace('Loaded view engine');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
log.trace('Loaded bodyParser middleware');

app.use('/~static', express.static(path.join(__dirname, 'public')));
app.use('/', authentication);
app.use('/', indexRoute);
app.use(catch404);
app.use(errorRoute);
log.trace('Loaded all express routes');

module.exports = app;
