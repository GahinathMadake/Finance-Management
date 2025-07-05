const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected Successfully!`)
  } catch (error) {
    console.error(`MongoDB Connection Error!`);
  }
}

module.exports = connectDB;
