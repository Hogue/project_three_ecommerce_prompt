var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect(config.mongo.dbUrl);

// Contact is the constructor function for the Contact model.
var Book = require('../models/books.js');
var User = require('../models/users.js');
var Order = require('../models/orders.js');

var bookIDs = {};
var userIDs = {};
var orderIDs = {};


var removeBooks = function(done) {
  Book.remove({}, done);
};

var addBook = function(done) {
  Book.create({
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marvin Haverbeke',
    price: 28.93,
    genre: 'programming',
    isbn: '978-1593275846',
    thumbnail: [
    {
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, function(err, book) {
    bookIDs["eloquent javascript"] = book._id;
    done();
  });
};

var addBookTwo = function(done) {
  Book.create({
    title: 'Second Book',
    author: 'Brub',
    price: 3.50,
    genre: 'fantasy',
    isbn: '978-1599085846',
    thumbnail: [
    {
      url: 'http://postimg.org/image/sd1pp6g61/'
    }]
  }, function(err, book) {
    bookIDs["book two"] = book._id;
    console.log(bookIDs);
    done();
  });
};

var removeOrders = function(done) {
  Order.remove({}, done);
};

var addOrder = function(done) {
  Order.create({
    books: [bookIDs["eloquent javascript"],bookIDs["book two"]],
    date: Date.now(),
    sent: true,
  },
    function(err, order) {
      orderIDs["Order One"] = order._id;
      console.log(order.books);
      done();
  });
};

// var addOrder = function(done) {
//   Order.create({
//     books: [bookIDs["book two"]],
//     date: Date.now(),
//     sent: true,
//   },
//     function(err, order) {
//       orderIDs["Order Two"] = order._id;
//       done();
//   });
// };

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
  }, function(err, user){
      // user.orders.set(0, mongoose.Types.ObjectId(orderIDs["Order One"]));
      // user.save(function(err) {
         userIDs['Andrew Ellis'] = user._id;
         done();
      // });
  });
};



async.series([
  // remove contacts
  removeBooks,
  // create socks contacts
  addBook,
  addBookTwo,
  removeOrders,
  addOrder,
  removeUsers,
  addUser
  ],
  // fire the function that will be invoked
  // when the above functions are done
  function(err) {
    if(err) {
      console.error(err);
    }
    // drop the db, because we don't need it anymore
    mongoose.disconnect();
  }

  );
