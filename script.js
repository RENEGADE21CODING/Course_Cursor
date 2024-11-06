// Fetch values from environment variables (this is if you're using a build tool like Vite/Webpack)
const supabaseUrl = 'https://yesyeuzhiftumudfbsam.supabase.co';  // Replace with your Supabase URL from .env
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3lldXpoaWZ0dW11ZGZic2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTI3MjYsImV4cCI6MjA0NjQ4ODcyNn0.xzkxofDA4E9hx3q6O3f4SDd0KK66YrbzqdpOmMzYvpM';  // Replace with your Supabase anon key from .env

// Initialize the Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Select DOM elements for the game
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickCash = document.getElementById('clickCash');

// Declare initial values for the game
let score = parseFloat(localStorage.getItem('score')) || 0.00;
let cashPerClick = parseFloat(localStorage.getItem('cashPerClick')) || 0.50;
let cashPerSecond = parseFloat(localStorage.getItem('cashPerSecond')) || 0.25;
let clickUpgradeCost = 10.00;
let automaticUpgradeCost = 10.00;

// Update the displayed score and upgrade info
function updateDisplay() {
  scoreDisplay.textContent = `Cash: $${score.toFixed(2)}`;
  document.getElementById('clickInfo').textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
  document.getElementById('automaticInfo').textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
}

// Save current game state to localStorage
function saveGameState() {
  localStorage.setItem('score', score.toString());
  localStorage.setItem('cashPerClick', cashPerClick.toString());
  localStorage.setItem('cashPerSecond', cashPerSecond.toString());
}

// Function to handle the click action (earn money)
clickCash.addEventListener('click', () => {
  score += cashPerClick;
  saveGameState();
  updateDisplay();
});

// Function to handle the click upgrade (increase cash per click)
upgradeClickButton.addEventListener('click', () => {
  if (score >= clickUpgradeCost) {
    score -= clickUpgradeCost;
    cashPerClick += 0.50; // Increase by 0.50 per click
    clickUpgradeCost *= 1.5; // Increase upgrade cost by 50%
    saveGameState();
    updateDisplay();
  } else {
    alert('Not enough cash for this upgrade!');
  }
});

// Function to handle the automatic upgrade (increase cash per second)
upgradeAutomaticButton.addEventListener('click', () => {
  if (score >= automaticUpgradeCost) {
    score -= automaticUpgradeCost;
    cashPerSecond += 0.25; // Increase by 0.25 per second
    automaticUpgradeCost *= 1.5; // Increase upgrade cost by 50%
    saveGameState();
    updateDisplay();
  } else {
    alert('Not enough cash for this upgrade!');
  }
});

// Function to earn money automatically over time (based on cash per second)
function earnCashAutomatically() {
  score += cashPerSecond;
  saveGameState();
  updateDisplay();
}

// Set an interval to earn money every second (this could be a longer interval if desired)
setInterval(earnCashAutomatically, 1000);

// Supabase Authentication: Login and Register
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('emailInput'); // New email input for registration

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Login Error:", error.message);
    alert("Error: " + error.message);
  } else {
    console.log("Logged in successfully:", data);
    alert("Logged in successfully!");
  }
});

registerButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Registration Error:", error.message);
    alert("Error: " + error.message);
  } else {
    console.log("User Registered successfully:", data);
    alert("User Registered successfully! Please check your email to verify.");
  }
});

// Add logic for logging out the user (if needed)
async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout Error:", error.message);
    alert("Error logging out: " + error.message);
  } else {
    console.log("Logged out successfully.");
    alert("Logged out successfully!");
  }
}

// Example: Function to update user game data (e.g., score)
async function updateGameData(userId, score) {
  const { data, error } = await supabase
    .from('game_data')
    .upsert([
      { user_id: userId, score: score }
    ]);

  if (error) {
    console.error("Game Data Update Error:", error.message);
    alert("Error updating game data: " + error.message);
  } else {
    console.log("Game data updated:", data);
    alert("Game data updated successfully!");
  }
}

// Example: Function to retrieve game data for a specific user
async function getGameData(userId) {
  const { data, error } = await supabase
    .from('game_data')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("Error retrieving game data:", error.message);
  } else {
    console.log("Game data retrieved:", data);
  }
}

// Example usage of retrieving the current user's session
async function getCurrentUser() {
  const user = supabase.auth.user();
  if (user) {
    console.log("Current user:", user);
    // You can then use the user's ID for game data
    await getGameData(user.id);
  } else {
    console.log("No user is logged in.");
  }
}

// Call this function to check the current user's session when the page loads
getCurrentUser();

// Call the updateDisplay function to update the page with initial values
updateDisplay();
