const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Mongo URI:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
