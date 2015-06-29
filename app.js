var config = require('./config/');

var express = require('express');
var async = require('async');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var jade = require('jade');
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var util = require('util');

var Book = require('./models/books.js');
var Order = require('./models/orders.js');
var User = require('./models/users.js');

var routes = require('./routes/index.js');
var admin = require('./routes/admin.js');
var users = require('./routes/users.js');
var books = require('./routes/books.js');
var orders = require('./routes/orders.js');
var charge = require('./routes/charge.js');

mongoose.connect(config.mongo.dbUrl);

var app = express();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', routes);
app.use('/admin', admin);
app.use('/users', users);
app.use('/books', books);
app.use('/orders', orders);
app.use('/stripe', charge);

// This uses express-generated middleware that serves static files
// It looks for a directory at the path we pass in.
// If the url matches anything in the directory, it will be served
// Else: Next fires, and moves on to next handler
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  // %s is a place holder that we replace with 'host' and 'port'
  // it says where %s is, put the first argument, then replace the second %s with the second argument (host, port — are the two arguments)
  console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = app;
