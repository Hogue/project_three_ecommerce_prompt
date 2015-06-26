var express = require('express');
var stripe = require('stripe')(
  "sk_test_hMafI2fQwte3fCxqem7TmF9w"
);
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Book = require('./books.js');
var User = require('./users.js');
var Order = require('../models/orders.js');




stripe.charges.create({
  amount: 400,
  currency: "usd",
  source: "tok_16HgmDHaEnmpuKy9iTXuSysN", // obtained with Stripe.js
  description: "Charge for test@example.com"
}, function(err, charge) {
  // asynchronously called
});




router.post('/stripe', function(req, res, next) {
  //Obtain Strip Token
  var stripeToken = req.body.stripeToken;

  var userID = req.user._id;
})
