var express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  jsonParser = bodyParser.json(),
  jade = require('jade'),
  fs = require('fs'),
  User = require('../models/users.js'),
  util = require('util');

router.get('/', jsonParser);
router.get('/', function(req, res, next) {
  User.find({}, function(err, usersList) {
    if (err) {
      console.log(err);
      res.send('Error retrieving Contacts');
    } else {
      res.json(usersList);
      res.status(200);
    }
  });
});

router.get('/:id', jsonParser);
router.get('/:id', function(req, res) {
  User.find({
    _id: req.params.id
  }, function(err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      // console.log('Result object: ' + result);
      // console.log('Last name should be: ' + result['nameLast']);
      res.json(result);
      res.status(200);
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
      console.log(err);
      res.sendStatus(400);
    } else {
      fs.readFile('./views/user.jade', 'utf8', function(err, data) {
        if (err) {
          console.log('Erroring Out');
          console.log(err);
          res.sendStatus(400);
        } else {
          var userCompiler = jade.compile(data);
          var html = userCompiler(promise);
          console.log(html);
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
      console.log(err);
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
      console.log(err);
      res.sendStatus(400);
    } else {
      console.log(userFound);
      res.json(userFound);
      // res.json(result);
    }
  });
});

module.exports = router;
