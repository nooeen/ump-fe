const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://neeoon:07032001@maincluster.i7dlu.mongodb.net/uet-db",
      {}
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    console.log("MongoDB failed to connect");
  }
}

module.exports = { connect };
