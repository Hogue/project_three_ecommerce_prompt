// Orders Schema
// Attributes: user, books, date, purchased
// Users: has many Orders
// Orders: has many Books

//require
var mongoose = require('mongoose');
var Book = require('./books.js');
var User = require('./users.js');

var orderSchema = new mongoose.Schema({
  user: [userSchema],
  books: [bookSchema],
  date: {
    type: Date,
    required: true
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
