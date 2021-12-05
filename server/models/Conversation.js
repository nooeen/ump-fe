const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    test: Array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);