var express = require('express');
var passport = require('passport');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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

