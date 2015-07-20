var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  jsonParser = bodyParser.json(),
  jade = require('jade'),
  fs = require('fs'),
  User = require('../models/users.js'),
  Order = require('../models/orders.js'),
  Book = require('../models/books.js'),
  util = require('util');
async = require('async');


router.get('/', jsonParser);
router.get('/', function(req, res, next) {
  User.find({}, function(err, usersList) {
    if (err) {
      res.send("error retrieving users");
    } else {
      async.each(usersList, function(user, done) {
        user.orders(function(err, orders) {
          if (err) {
            console.log("it didn't work, shit");
            next(err);
          }
          user.orderList = orders;
          console.log("add orders to %s ", user.email);
          done();
        });
      }, function(err, data) {
        if (err) {
          next(err);
        }
        console.log(usersList);
        res.json(usersList);
        res.status(200);
      });
    }
  });
});




router.get('/:id', jsonParser);
router.get('/:id', function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, result) {
    if (err) {
      console.log(err.name);
      res.send(err.name);
    } else {
      res.json(result);
      res.status(200);
    }
  });
});

router.get('/:id/orders', jsonParser);
router.get('/:id/orders', function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, userFound) {
    if (err) {
      console.log(err.name);
      res.send(err.name);
    } else {
      res.render('history', {
        orderList: userFound.Orders
      });
      res.status(200);
    }
  });
});

var tempBook = {};

router.post('/:id/addtocart', jsonParser);
router.post('/:id/addtocart', function(req, res){

});


router.post('/:id/orders', jsonParser);
router.post('/:id/orders', function(req, res) {
  var orderIds = [];
  User.findOne({
    _id: req.params.id
  }, function(err, userFound) {
    if (err) {
      console.log(err.name);
      res.send(err.name);
    } else {
      // console.log(userFound);
      orderIds = userFound.Orders;
      console.log('Order IDS: ' + orderIds);
      orderIds.forEach(function(orderID) {
        Order.findOne({
          _id: orderID
        }, function(err, orderFound) {
          if (err) {
            console.log(err);
          } else {
            bookList = orderFound.books;
            console.log(bookList);
            bookList.forEach(function(bookId) {
              var cart = [];
              Book.findOne({
                _id: bookId
              }, function(err, book) {
                cart.push(book);
                console.log('cart status: ' + cart);
              });
            });
            console.log('Cart: ', cart);
            res.render('cart', {
              cart: cart,
              user: req.user
            });
          }
        });
      });
    }
  });
});

/* Add user */
router.post('/', jsonParser);
router.post('/', function(req, res) {
  User.create({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    email: req.body.email,
    password: req.body.password
  }, function(err, promise) {
    if (err) {
      console.log(err.name);
      res.send(err.name);
    } else {
      fs.readFile('./views/user.jade', 'utf8', function(err, data) {
        if (err) {
          console.log('Erroring Out');
          res.send(err.name);
        } else {
          var userCompiler = jade.compile(data);
          var html = userCompiler(promise);
          res.send(html);
          res.status(200);
        }
      });
    }
  });
});

router.delete('/:id', function(req, res) {
  User.findOneAndRemove({
    _id: req.params.id
  }, function(err, ghost) {
    if (err) {
      console.log(err.name);
      res.sendStatus(400);
    } else {
      res.send({
        _id: ghost._id,
        type: 'user'
      });
      res.status(204);
    }
  });
});

router.patch('/:id', function(req, res) {
  console.log(req);
  User.findByIdAndUpdate(req.params.id, {
    // email: req.body.email
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    email: req.body.email,
    password: req.body.password
  }, function(err, userFound) {
    if (err) {
      console.log(err.name);
      res.send(err.name);
      res.sendStatus(400);
    } else {
      res.json(userFound);
    }
  });
});

module.exports = router;
