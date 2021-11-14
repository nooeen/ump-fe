const mongoose = require("mongoose");
var Int32 = require('mongoose-int32').loadType(mongoose);
const bcrypt = require("bcrypt");

const saltRounds = 10;


const User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fullname: {type: String},
  dob: {type: String},
  history: {
    term: {type: String},
    gpa: {type: Number},
    tpa: {type: Number},
    credit: {type: Number}
  },
  class: { type: String},
  hasPaid: {type: Boolean}
});


User.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});


User.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};


module.exports = mongoose.model('User', User,'users');
