var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main', {
    title: 'Nozama Books',
    user: req.user
  });
});

//---------CLIENTSIDE INTERFACE---------

//Note: Once authentication is implemented, add 'get Current User' to this function, so their User ID is stored in the browser for making payment
//Also add their name to the page itself
router.get('/checkout', function(req, res) {
  res.render('checkout', {
    userNameFull: "Beryl Berlioz",
  });
});

module.exports = router;
