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

router.post('/stripe', function(req, res, next) {
  //Obtain Stripe Token
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // amount is in cents
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
})

module.exports = router;
