var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true
  }
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
