var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Book = require('./books.js');
var User = require('./users.js');
var Order = require('../models/orders.js');

// GET checkout page
router.get('/', function(req, res) {
  res.render('checkout', {
    user: req.user
  });
});

module.exports = router;
