// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the app if MongoDB connection fails
  }
};

// Call the function to connect to MongoDB
connectDB();

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  userId: String,
});

const User = mongoose.model('User', userSchema);

// API Endpoint to save Telegram user data
app.post('/api/saveUser', async (req, res) => {
  const { username, userId } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(200).send({ message: 'User already exists' });
    }

    // Save new user
    const newUser = new User({ username, userId });
    await newUser.save();
    res.status(200).send({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send({ message: 'Error saving user', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
