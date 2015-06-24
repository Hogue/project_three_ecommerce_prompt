//==============================================
//          USER SCHEMA SETUP
//==============================================
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Order = require('./orders.js');

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  // password: {
  //   type: String,
  //   required: true
  // },
  nameFirst: {
    type: String,
    required: true
  },
  nameLast: {
    type: String,
    required: true
  },
  Orders: [Order.schema]
});

userSchema.virtual('library').get(function() {
  var library = [];
  this.Orders.forEach(function(order){
    order.books.forEach(function(book){
      library.push(book);
    });
  });
});

userSchema.virtual('fullName').get(function() {
  return this.nameFirst + ' ' + this.nameLast;
});

//create model
var User = mongoose.model('User', userSchema);
//export module
module.exports = User;
