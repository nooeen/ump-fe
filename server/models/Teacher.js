const mongoose = require("mongoose");
var Int32 = require('mongoose-int32').loadType(mongoose);
const bcrypt = require("bcrypt");

const saltRounds = 10;



const Teacher = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, required: true },
  fullname: { type: String, required: true },
  dob: { type: Date },
  classes: [String],
});



Teacher.pre("save", function (next) {
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


Teacher.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};


module.exports = mongoose.model('Teacher', Teacher,'users');
