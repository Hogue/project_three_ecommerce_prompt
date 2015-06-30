var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Book = require('./books.js');
var User = require('./users.js');
var Order = require('./orders.js');

router.get('/', function(req, res) {
  res.render('orderComplete', {
    user: req.user,
    book: 'Being and Nothingness',
    author: 'John Paul Sartre',
    price: '10.99'
  });
});

module.exports = router;
