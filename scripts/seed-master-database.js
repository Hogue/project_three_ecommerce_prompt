var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

mongoose.connect(config.mongo.dbUrl);
var Book = require('../models/books.js');
var User = require('../models/users.js');
var Order = require('../models/orders.js');

var removeBooks = function(done) {
  Book.remove({}, done);
};

var removeUsers = function(done) {
  User.remove({}, done);
};

var removeOrders = function(done) {
  Order.remove({}, done);
};

var addBook = function(done) {
  Book.create({
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marvin Haverbeke',
    price: 28.93,
    genre: 'programming',
    isbn: '978-1593275846',
    thumbnail: [{
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, done);
};

var addUser = function(done) {
  User.create({
    email: 'drewasdfasdfkakes@gmail.com',
    nameFirst: 'Andrew',
    nameLast: 'Ellis',
    password: 'abc123',
    orders: []
  }, done);
};

var addOrder = function(done) {
  Order.create({
    user: User,
    books: [],
    date: Date.now(),
    sent: true
  }, done);
};

async.series([
    removeBooks,
    addBook,
    removeUsers,
    addUser,
    removeOrders,
    addOrder
  ],
  // fire the function that will be invoked
  // when the above functions are done
  function(err) {
    if (err) {
      console.error(err);
    }
    // drop the db, because we don't need it anymore
    mongoose.disconnect();
  }

);
