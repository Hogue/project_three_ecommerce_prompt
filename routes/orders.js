var express = require('express');
var router = express.Router();
var Order = require('../models/orders.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var util = require('util');

router.get('/', jsonParser);
// GET orders listing
router.get('/', function(req, res) {
  Order.find({}, function(err, orderList) {
    if (err) {
      res.sendStatus(404);
    }
    res.json(orderList);
    res.status(200);
  });
});

// GET individual orders listing

router.get('/orders/:id', function(req, res, next) {
  Order.find({
    _id: req.params.id
  }, function(error, order) {
    if (error) {
      console.log(error);
      res.send('Error; cannot GET order by id');
    } else {
      res.json(order);
      res.status(200);
    }
  });
});

//GET all orders by one user
//Note: check for errs
// - may need req.params.user.id instead?
router.get('user/:id/orders', function(req, res, next) {
  Order.find({
    user: req.user.id
  }, function(error, orders) {
    if (error) {
      console.log(error);
      res.send('Error; cannot GET orders by user ID');
    } else {
      res.json(order);
      res.status(200);
    }
  });
});

//POST new order
<< << << < HEAD
router.post('/orders', jsonParser);
router.post('/orders', bodyParser());
router.post('/orders', function(req, res, next) { === === =
      router.post('/', function(req, res) { >>> >>> > Added materialize and views
        for adding stuff easily
        Order.create({
          user, books, date, purchased
          user: req.body.user,
          books: req.body.books,
          date: req.body.date,
          purchased: false
        }, function(err, promise) {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          } else {
            res.json(promise);
            res.status(200);
          }
        });
      });

    //PATCH new individual book on an order
    //Note: is PUT better? Check for errs
    // - esp. removing old Books from the order when adding new ones.

    router.patch('/orders', jsonParser);
    router.patch('/orders', bodyParser());
    apiRouter.patch('/orders/:id', function(req, res) {
      Contact.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, function(error, orders) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      });
    });

    //DELETE order
    router.delete('/orders/:id', function(req, res) {
      Order.remove({
        _id: req.params.id
      }, function(error) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    });

    //add jsonParser and bodyParser to each request

    module.exports = router;
