var express = require('express');
var router = express.Router();

// GET orders listing
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:order_id', function(req, res, next) {
  res.send('');
});


module.exports = router;
