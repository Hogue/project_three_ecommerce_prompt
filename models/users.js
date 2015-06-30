//==============================================
//          USER SCHEMA SETUP
//==============================================
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    Order = require('./orders.js');
    Hash = require('password-hash');

//===ADDRESS SUB-SCHEMAs======
var emailAddressSchema = new mongoose.Schema({
  emailAddress: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  }
});

var enumeratedStates = ['AL AK AS AZ AR CA CO CT DE DC FM FL',
  'GA GU HI ID IL IN IA KS KY LA ME MH MD MA MI MN MS MO MT',
  'NE NV NH NJ NM NY NC ND MP OH OK OR PW PA PR RI SC SD TN TX',
  'UT VT VI VA WA WV WI WY'
].join(' ').split(' ');

//========= ADDRESS SCHEMA ==========
var addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  secondStreet: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: {
      values: enumeratedStates
    }
  },
  zipCode: {
    type: String,
    required: true
    //match: /^\d{5}(-\d{4})?$/
  },
  country: {
    type: String,
    default: "USA"
  },
});

//==========USER SCHEMA=================
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    set: function(newValue) {
      return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    }
  },
  nameFirst: {
    type: String,
    required: true,
  },
  nameLast: {
    type: String,
    required: true
  },
  Address: [addressSchema],
  Orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
});

userSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({
    email: email
  }, function(error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      console.log("Email or password was invalid");
      error = new Error("Your email address or password is invalid. Please try again");
      callback(error, null);
    } else {
      console.log("Something bad happened with MongoDB. You shouldn't run into this often");
      callback(error, null);
    }
  });
};

userSchema.virtual('library').get(function() {
  var library = [];
  this.Orders.forEach(function(order) {
    order.books.forEach(function(book) {
      library.push(book);
    });
  });
});

userSchema.virtual('nameFull').get(function() {
  return this.nameFirst + ' ' + this.nameLast;
});

userSchema.virtual('orderHistory').get(function() {
  ordersList = [];
  Orders.forEach(function(order) {
    if (order.date < Date.now()) {
      ordersList.push(order);
    }
  });
  return ordersList;
});

userSchema.virtual('getCart').get(function() {
  cart = []
  this.Orders.forEach(function(order) {
   if(order.date === Date.now() && order.purchased === false) {
    Cart.push(order);
   }
  });
  return cart;
});


userSchema.method('orders', function(done) {
  User.find({
    orders: {
      $elemMatch: {
        _id: this._id
      }
    }
  }, done)
});

//create model
var User = mongoose.model('User', userSchema);
//export module
module.exports = User;
