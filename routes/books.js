var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Book = require('../models/books.js');

router.get('/books', function(req, res) {
  Book.find({},function(err, bookList) {
    if(err) {
      res.sendStatus(404);
    }
    res.json(bookList);
    res.status(200);
  });
});

router.get('/books/:id', function(req, res) {
  Book.find({
    _id: req.params.id
  }, function(err, book){
    if(err) {
      console.log(err);
      set.sendStatus(404);
    }
    res.json(book);
  });
});

router.post('/books', jsonParser);
router.post('/books', bodyParser());
router.post('/books', function(req, res) {
  Book.create(req.body, function(error, book) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

router.patch('/books/:id', jsonParser);
router.patch('/books/:id', bodyParser());
router.patch('/books/:id', function(req, res) {
  Book.findByIdAndUpdate(req.params.id, req.body, function(error, book) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

// router.get('/', function(req, res){
//   res.send("It worked!");
// });

// router.post('/', function(req, res){
//   res.send('post worked!');
// });

// router.route('/:book_id')
//   .all(function(req, res, next) {
//     contact_id = req.params.book_id;
//     next();
//   })
//   .get(function(req, res){
//     res.send("Hello " + book_id);
//   })
//   .post(function(req, res){
//     res.send('Post for contact ' + book_id);
//   })
//   .put(function(req, res){
//     res.send('Put for contact ' + book_id);
//   })
//   .delete(function(req, res){
//     res.send('book number ' + book_id + " " + "has been deleted!");
//   });


module.exports = router;
