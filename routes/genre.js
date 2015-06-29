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
      bookList: bookList,
      user: req.user
    });
    res.status(200);
  });
});


router.get('/:genre', function(req, res) {
  console.log(req.params);
  Book.find({
    'genre': req.params.genre
  }, function(err, bookList) {
    if (err) {
      res.sendStatus(404);
    }
    res.render('genre', {
      bookList: bookList,
      user: req.user
    });
  });
});

module.exports = router;
