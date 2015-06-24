var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

// connect to the contacts DB.
console.log(config);
mongoose.connect(config.mongo.dbUrl);

// Contact is the constructor function for the Contact model.
var Book = require('../models/books.js');
// var Image = require('../models/books.js');
// var Image = require('../models/images.js');

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
  }, done);
};


async.series([
  // remove contacts
  removeBooks,
  // create socks contacts
  addBook
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
