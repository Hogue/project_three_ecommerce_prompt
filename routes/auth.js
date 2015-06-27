var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// REGISTER
router.route('/register')
  .get(function(req, res, next) {
    res.render('register', {});
  })
  .post(function(req, res, next) {
    Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
      if(err) {
        return res.render('register', {account: account});
      }

      req.login(account, function(err) {
        res.redirect('/contacts');
      });
    })
  })

// LOGIN

router.get('/login', function(req, res, next) {
  res.render('login', {user: req.user});
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/login', jsonParser);
router.post('/login', function(req, res, next){
  console.log(req.body);
  next();
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;

