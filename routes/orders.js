var express = require('express'),
  router = express.Router(),
  Order = require('../models/orders.js'),
  bodyParser = require('body-parser'),
  jsonParser = bodyParser.json(),
  jade = require('jade'),
  fs = require('fs'),
  util = require('util');

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

router.get('/:id', function(req, res, next) {
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

// app.post('/articles', jsonParser);
// app.post('/articles', function(req, res) {
//   Article.create(req.body,
// function(error, article) {
//     if (error) {
//       console.log(error);
//     } else {
//       fs.readFile('./templates/article.jade', 'utf8', function(err, data) {
//         if (err) {
//           res.sendStatus(400);
//         } else {
//           var articleCompiler = jade.compile(data);
//           var html = articleCompiler(article);
//           res.send(html);
//           res.status(200);
//         }
//       });
//     }
//   });
// });

//POST new order
router.post('/', jsonParser);
router.post('/', function(req, res) {
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
      fs.readFile('./views/order.jade', 'utf8', function(err, data) {
        if (err) {
          console.log(err);
          res.sendStatus(400);
        } else {
          console.log('GOT THROUGH');
          var userCompiler = jade.compile(data);
          console.log('passed compiler');
          console.log(promise);
          var html = userCompiler(promise);
          console.log('made html');
          res.send(html);
          res.status(200);
        }
      });
    }
  });
});

//PATCH new individual book on an order
//Note: is PUT better? Check for errs
// - esp. removing old Books from the order when adding new ones.

router.patch('/', jsonParser);
router.patch('/', bodyParser());
apiRouter.patch('/:id', function(req, res) {
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
router.delete('/:id', function(req, res) {
  Order.findOneAndRemove({
    _id: req.params.id
  }, function(error, ghost) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.send({
        _id: ghost._id,
        type: 'order'
      });
      res.status(204);
    }
  });
});

//add jsonParser and bodyParser to each request

module.exports = router;
