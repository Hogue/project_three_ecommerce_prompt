var config = require('../config');
var mongoose = require('mongoose');
var async = require('async');
var User = require('../models/users.js');

mongoose.connect(config.mongo.dbUrl);

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
      password: 'jello99',
      nameFirst: 'Andrew',
      nameLast: 'Ellis',
      orders: []
    }, done);
  }
  ], function(err){
    if (err) {
      console.log(err);
    }
    mongoose.disconnect();
  });


