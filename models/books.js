// Book
// Title (String)
// Author (String)
// Price (Number)
// Genre (String: Enumerated Type)
// [Optional]
// ISBN
// Thumbnail
// Length

  //require
var mongoose = require('mongoose');
require('./images.js');
var Schema = mongoose.Schema;

var enumeratedGenreTypes = ['childrens', 'classics', 'fantasy', 'fiction', 'history', 'philosophy', 'programming', 'science fiction'];

// var imageSchema = new mongoose.Schema({
//   url: {
//     type: String,
//     require: true
//   }
// });

var bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: enumeratedGenreTypes
    }
  },
  isbn: String,
  thumbnail: [mongoose.model('Image').schema]
});

//create model
var Book = mongoose.model('Book', bookSchema);
//export module
module.exports = Book;
