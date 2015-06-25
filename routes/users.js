var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('../models/users.js');

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
router.get('/:id', function(req, res){
  User.find({
    _id: req.params.id
  }, function(err, result){
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
router.post('/', function(req, res) {
  User.create({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    email: req.body.email,
    password: req.body.password
  }, function(err, promise){
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.json(promise);
      res.status(200);
    }
  });
});

router.delete('/:id', function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err){
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      res.send('User Deleted');
    }
  });
});

router.patch('/:id', function(req, res){
  console.log(req);
  User.findByIdAndUpdate(req.params.id, {
    // email: req.body.email
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    email: req.body.email,
    password: req.body.password
  }, function(err, userFound){
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

router.post('/', function(req, res) {
  res.send('Attempting to Post');
});


module.exports = router;
