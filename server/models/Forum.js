const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const ForumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    class: { type: String },
    created_by: { type: String },
    created_at: { type: Date , default: Date.now },
    content: { type: String },
    contents: {
      created_by: {type: String},
      created_at: {type: Date, default: Date.now },
      content: {type: String },
    },
  },
);
module.exports = mongoose.model("posts", ForumSchema);
