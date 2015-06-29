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

router.get('/', function(req, res, next) {
  console.log('got to stripe');
  res.send("Scram!");
});

router.post('/', function(req, res, next) {
  console.log('got to post stripe');
  //Obtain Stripe Token
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    //amount is in cents
    amount: 1000,
    currency: "usd",
    source: stripeToken,
    description: "Example charge"

  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log('Card declined');
      // The card has been declined
    }
    console.log(err);
  });
})

module.exports = router;
