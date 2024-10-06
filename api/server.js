// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    const newUser = new User({ username, userId });
    await newUser.save();
    res.status(200).send({ message: 'User saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));