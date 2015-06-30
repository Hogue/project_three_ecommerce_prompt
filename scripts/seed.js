var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://andrew.hogue:Hog94306-@ds063899.mongolab.com:63899/nozama');

// Contact is the constructor function for the Contact model.
var Book = require('../models/books.js');
var User = require('../models/users.js');
var Order = require('../models/orders.js');

var bookIDs = [];
var userIDs = {};
var orderIDs = {};


var removeBooks = function(done) {
  Book.remove({}, done);
};

var addBookTwo = function(done) {
  Book.create({
    title: 'Foundation',
    author: 'Isaac Asimov',
    price: 3.50,
    genre: 'science fiction',
    isbn: '978-1599085846',
    thumbnail: [{
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, function(err, book) {
    bookIDs.push(book._id);

  }, done());
};

var addBookThree = function(done) {
  Book.create({
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    price: 13.50,
    genre: 'fantasy',
    isbn: '978-1049085846',
    thumbnail: [{
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, function(err, book) {
    bookIDs.push(book._id);

  }, done());
};

var addBookFour = function(done) {
  Book.create({
    title: 'A Game of Thrones',
    author: 'George R. R. Martin',
    price: 14.99,
    genre: 'fantasy',
    isbn: '978-04958089545',
    thumbnail: [{
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, function(err, book) {
    bookIDs.push(book._id);

  }, done());
};

var removeOrders = function(done) {
  Order.remove({}, done);
};

var addOrder = function(done) {
  Order.create({
      books: [bookIDs[0], bookIDs[1]],
      date: Date.now(),
      sent: true,
    },
    function(err, order) {
      orderIDs["Order One"] = order._id;

    }, done());
};

var removeUsers = function(done) {
  User.remove({}, done);
};

var addUser = function(done) {
  User.create({
    email: 'drewkakes@gmail.com',
    nameFirst: 'Andrew',
    nameLast: 'Ellis',
    password: 'abc123',
    Orders: orderIDs["Order One"]
  }, function(err, user) {
    userIDs['Andrew Ellis'] = user._id;
  }, done());
};

var shitTest = function(done) {
  User.findOne(userIDs['Andrew Ellis'], function(err, result) {
    result.orders();
    console.log(result.orders());
  }, done());
};



async.series([
    removeBooks,
    addBookThree,
    addBookFour,
    addBookTwo,
    removeOrders,
    addOrder,
    removeUsers,
    addUser,
    shitTest
  ],
  function(err) {
    if (err) {
      console.error(err);
    }
    mongoose.disconnect();
  }

);
