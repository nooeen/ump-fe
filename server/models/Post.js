const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseDelete = require('mongoose-delete');

const saltRounds = 10;

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    class: { type: String },
    created_by: { type: String },
    // created_at: { type: Date , default: Date.now },
    content: { type: String },
    contents: [{
      type: new mongoose.Schema(
        {
          created_by: {type: String },
          // created_at: {type: Date },
          content: {type: String },
        },
        {
          timestamps: true,
        },
      )
    }],
  },
  {
    timestamps: true,
  },
);

PostSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model("posts", PostSchema);
