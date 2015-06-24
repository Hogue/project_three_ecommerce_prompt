var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send("It worked!");
});

router.post('/', function(req, res){
  res.send('post worked!');
});

router.route('/:book_id')
  .all(function(req, res, next) {
    contact_id = req.params.book_id;
    next();
  })
  .get(function(req, res){
    res.send("Hello " + book_id);
  })
  .post(function(req, res){
    res.send('Post for contact ' + book_id);
  })
  .put(function(req, res){
    res.send('Put for contact ' + book_id);
  })
  .delete(function(req, res){
    res.send('book number ' + book_id + " " + "has been deleted!");
  });


module.exports = router;
