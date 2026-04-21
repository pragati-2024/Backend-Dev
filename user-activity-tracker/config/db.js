const mongoose = require("mongoose");

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI missing in environment");
  }

  await mongoose.connect(uri);
  return mongoose.connection;
}

module.exports = { connectDb };
