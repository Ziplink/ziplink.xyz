'use strict';

var CONFIG = require('ziplink-config');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var errorHandlers = require('./lib/middleware/errorHandlers.js');

var indexRoute = require('./routes/index');

var authentication = require('ziplink-passport-authentication')(CONFIG);

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/~static', express.static(path.join(__dirname, 'public')));

app.use('/', authentication);

app.use('/', indexRoute);

// Any undefined routes use this final default route
app.use(errorHandlers.catch404);

/******************
 * Error handlers *
 ******************/

if (app.get('env') === 'production') {
  app.use(errorHandlers.production);
} else {
  app.use(errorHandlers.development);
}

module.exports = app;
