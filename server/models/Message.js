const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const messageSchema = new mongoose.Schema({
      sender: {
        type: String,
      },
      receiver: { 
        type: String
      },
      text: {
        type: String,
      },
      createdAt: Date
}, { timestamps: true } );


module.exports = mongoose.model("message", messageSchema);
