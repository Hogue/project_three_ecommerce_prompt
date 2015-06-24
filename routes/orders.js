var express = require('express');
var router = express.Router();
var Order = require('../models/orders.js');

// GET orders listing
router.get('/', function(req, res) {
  Order.find({},function(err, orderList) {
    if(err) {
      res.sendStatus(404);
    }
    res.json(orderList);
    res.status(200);
  });
});

router.get('/:order_id', function(req, res, next) {
  res.send('');
});


module.exports = router;
