//==============================================
//          USER SCHEMA SETUP
//==============================================
var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({});
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  nameFirst: {
    type: String,
    required: true
  },
  nameLast: {
    type: String,
    required: true
  },
  Orders: [orderSchema]
});

//create model
var User = mongoose.model('User', userSchema);
//export module
module.exports = User;
