var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

// connect to the DB.
console.log(config);
mongoose.connect(config.mongo.dbUrl);

//Constructors for the Book and User schema
var Book = require('../models/books.js');
var User = require('../models/users.js');

var removeOrders = function(done) {
  Order.remove({}, done);
};

async.series([
  //Delete all orders from the database
  //NOTE: may want to remove for production
  removeOrders,

  function(done) {
    Order.create({
      user: User.id(),
      books: Book.id(),
      date: Date.now,
      purchased: true
    }, done);
  },

  function(done) {
    Order.create({
      user: User.id(),
      books: Book.id(),
      date: Date.now,
      purchased: true
    }, done);
  },

  function(done) {
    Order.create({
      user: User.id(),
      books: Book.id(),
      date: Date.now,
      purchased: true
    }, done);
  }

], function(err) {
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
