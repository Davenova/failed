// telegram.js
const axios = require('axios');
require('dotenv').config();

const botToken = process.env.TELEGRAM_TOKEN; // Your bot token

// Function to handle the /start command or any user message
const handleUserStart = async (msg) => {
  const userId = msg.from.id;
  const username = msg.from.username;

  try {
    // Send the username and userId to the backend API
    await axios.post(`${process.env.VERCEL_URL}/api/saveUser`, {
      username,
      userId,
    });
    console.log('User data sent to backend');
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

module.exports = { handleUserStart };