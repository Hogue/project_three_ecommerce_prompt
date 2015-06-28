//==============================================
//          USER SCHEMA SETUP
//==============================================
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Order = require('./orders.js');
var Hash = require('password-hash');

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    set: function(newValue) {
      return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    }
  },
  nameFirst: {
    type: String,
    required: true,
  },
  nameLast: {
    type: String,
    required: true
  },
  Orders: [Order.schema]
});

userSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email }, function(error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      console.log("Email or password was invalid");
      error = new Error("Your email address or password is invalid. Please try again");
      callback(error, null);
    } else {
      console.log("Something bad happened with MongoDB. You shouldn't run into this often");
      callback(error, null);
    }
  });
};

userSchema.virtual('library').get(function() {
  var library = [];
  this.Orders.forEach(function(order){
    order.books.forEach(function(book){
      library.push(book);
    });
  });
});

userSchema.virtual('nameFull').get(function() {
  return this.nameFirst + ' ' + this.nameLast;
});

userSchema.virtual('orderHistory').get(function() {
  ordersList = [];
  Orders.forEach(function(order){
    if (order.date < Date.now()) {
      ordersList.push(order);
    }
  });
  return ordersList;
});

//create model
var User = mongoose.model('User', userSchema);
//export module
module.exports = User;
