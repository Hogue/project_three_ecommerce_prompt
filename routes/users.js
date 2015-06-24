var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var User = require('../models/users.js');




// router.all('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });

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
  // res.json(req.user);
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  User.create({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    email: req.body.email
  });
});

router.post('/', function(req, res) {
  res.send('Attempting to Post');
});


module.exports = router;
