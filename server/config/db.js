const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected".cyan);
  } catch (err) {
    throw new Error("MongoDB Falied " + err.message);
  }
}

module.exports = connectDB;
