const mongoose = require('mongoose');
require('dotenv').config({path: '../vars/.env'});
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
