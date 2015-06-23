// Books
// Books have reviews
// Books — author, title, subtitle, format, pub_date, ISBN-13, ISBN-10, edition, condition, language, price, subject, description, reviews, keywords
// Reviews — username, date, comment, approve_flag

  //require
  var mongoose = require('mongoose');

  //connect to server
  // mongoose.connect('mongodb://localhost/amazon');

  //
  enumeratedFormatTypes = ['digital', 'hardback', 'paperback'];
  enumeratedConditionTypes = ['new','used'];


  var reviewSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    approval_flag: {
      type: Boolean,
      default: false
    }
  });

  var bookSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    format: {
      type: String,
      required: true,
      enum: {
        values: enumeratedFormatTypes
      }
    },
    pub_date: String,
    ISBN_13: String,
    ISBN_10: String,
    edition: String,
    condition: {
      type: String,
      required: true,
      enum: {
        values: enumeratedConditionTypes
      }
    },
    language: String,
    price: {
      type: Number,
      required: true
    },
    subject: String,
    description: String,
    keywords: String,
    reviews: [reviewSchema]
  });




//create model
var Book = mongoose.model('Book', bookSchema);
//export module
module.exports = Book;
