const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  fullname: { type: String },
  dob: { type: String },
  student_phone: { type: String },
  parent_phone: { type: String },
  phone: {type: String},
  address: { type: String },
  avatar: { type: String },
  history: [{
    term: { type: String },
    gpa: { type: mongoose.Types.Decimal128 },
    tpa: { type: Number },
    credit: { type: Number },
    _id : false,
  }],
  class: { type: String },
  hasPaid: { type: Boolean },
});

UserSchema.pre("save", function (next) {
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

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("users", UserSchema);
