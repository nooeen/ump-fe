const mongoose = require("mongoose");
var Int32 = require('mongoose-int32').loadType(mongoose);
const bcrypt = require("bcrypt");

const saltRounds = 10;


const History = new mongoose.Schema({
  term: String,
  gpa: { type: String, default: 0 },
  tpa: { type: String, default: 0 },
  credit: {type: String, default: 0},
});

const Student = new mongoose.Schema({
  class: { type: String },
  dob: { type: Date },
  fullname: { type: String },
  hasPaid: { type:String },
  history: { type:String },
  password: { type: String },
  role: { type: String },
  username: { type: String },
});


Student.pre("save", function (next) {
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


Student.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};


module.exports = mongoose.model('Student', Student, 'users');