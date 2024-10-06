// Initialize Telegram WebApp
Telegram.WebApp.ready();

// Get user data
const userData = Telegram.WebApp.initDataUnsafe;
const username = userData.user.username;
const userId = userData.user.id;

// Send user data to the backend API on button click
document.getElementById('startButton').addEventListener('click', () => {
  fetch('https://your-vercel-domain.vercel.app/api/saveUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, userId }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('User data sent:', data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
});