var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  jsonParser = bodyParser.json(),
  jade = require('jade'),
  fs = require('fs'),
  Book = require('../models/books.js'),
  Order = require('../models/orders.js'),
  User = require('../models/users.js');


router.get('/', function(req, res) {
  Book.find({}, function(err, bookList) {
    if (err) {
      res.sendStatus(404);
    }
    res.render('genre', {
      bookList: bookList
    });
    res.status(200);
  });
});


router.get('/fantasy', function(req, res) {
  Book.find({
    'genre': 'fantasy'
  }, function(err, bookList) {
    if (err) {
      res.sendStatus(404);
    }
    res.render('genre', {
      bookList: bookList
    });
  });
});


router.get('/add-user', function(req, res) {
  User.find({}, function(err, userList) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.render('user-generator', {
      users: userList
    });
  });
});


router.get('/add-order', function(req, res) {
  Order.find({}, function(err, orderList) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.render('order-generator', {
      orders: orderList
    });
  });
});

module.exports = router;
