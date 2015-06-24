var mongoose = require('mongoose');
var async = require('async');
var User = require('../models/users.js');
var dbName = 'nozama'; // Set name of database
var mongoUrl = 'mongodb://localhost/' + dbName; // Add suffix to the mongodb://localhost
mongoose.connect(mongoUrl); //Connect to the actual mongo DB

// mongoose.connect('mongodb://localhost/nozama');

// Function to remove all Users on seed
var removeUsers = function(done) {
  User.remove({}, done);
};

async.series([
  removeUsers,
  function(done){
    User.create({
      email: 'drewkakes@gmail.com',
      nameFirst: 'Andrew',
      nameLast: 'Ellis'
    }, done);
  }
  ], function(err){
    if (err) {
      console.log(err);
    }
    mongoose.disconnect();
  });
