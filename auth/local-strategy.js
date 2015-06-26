  var User = require('../models/users.js');
  var passport = require('passport');
  var PassportLocalStrategy = require('passport-local');

var authStrategy = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done) {
  User.authenticate(email, password, function(error, user){
    done(error, user/*, error ? { message: error.message } : null*/);
  });
});

var authSerializer = function(user, done) {
  done(null, user.id);
};

var authDeserializer = function(id, done) {
  User.findById(id, function(error, user) {
    done(error, user);
  });
};

passport.use(authStrategy);
passport.serializeUser(authSerializer);
passport.deserializeUser(authDeserializer);

module.exports = passport;
