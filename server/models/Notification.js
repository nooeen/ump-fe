const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  class: {
    type: String,
  },
  comments: { type: [] },
});

module.exports = mongoose.model("notifications", notificationSchema);
