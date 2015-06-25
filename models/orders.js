// Orders Schema
// Attributes: user, books, date, purchased
// Users: has many Orders
// Orders: has many Books

//require
var mongoose = require('mongoose');
var Book = require('./books.js');
var User = require('./users.js');

//Note: could install momentjs, a node module that parses dates for you easily
//(see: http://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js)
var orderSchema = new mongoose.Schema({
  user: [User],
  books: [Book],
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  purchased: {
    type: Boolean,
    default: false,
    required: true,
  }
});

//create model
var Order = mongoose.model('Order', orderSchema);
//export module
module.exports = Order;
