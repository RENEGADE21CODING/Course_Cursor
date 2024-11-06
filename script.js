// Initialize Supabase
const supabaseUrl = 'https://yesyeuzhiftumudfbsam.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-supabase-anon-key-here'; // Replace with your Supabase anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickCash = document.getElementById('clickCash');
const statsButton = document.getElementById('statsButton');
const settingsButton = document.getElementById('settingsButton');
const loginRegisterButton = document.getElementById('loginRegisterButton');
const closeSettings = document.getElementById('closeSettings');
const loginRegisterOverlay = document.getElementById('loginRegisterOverlay');
const closeLoginRegister = document.getElementById('closeLoginRegister');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

// Variables
let score = 0;
let cashPerClick = 0.5;
let cashPerSecond = 0.25;
let upgradeClickCost = 10;
let upgradeAutomaticCost = 10;
let userData = null;

// Load stored data from local storage
function loadGameData() {
  const savedScore = localStorage.getItem('score');
  const savedCashPerClick = localStorage.getItem('cashPerClick');
  const savedCashPerSecond = localStorage.getItem('cashPerSecond');

  if (savedScore) {
    score = parseFloat(savedScore);
  }
  if (savedCashPerClick) {
    cashPerClick = parseFloat(savedCashPerClick);
  }
  if (savedCashPerSecond) {
    cashPerSecond = parseFloat(savedCashPerSecond);
  }

  updateScoreDisplay();
}

// Save data to local storage
function saveGameData() {
  localStorage.setItem('score', score);
  localStorage.setItem('cashPerClick', cashPerClick);
  localStorage.setItem('cashPerSecond', cashPerSecond);
}

// Update the score display on the page
function updateScoreDisplay() {
  scoreDisplay.innerText = `Cash: $${score.toFixed(2)}`;
}

// Handle clicking for cash
clickCash.addEventListener('click', () => {
  score += cashPerClick;
  updateScoreDisplay();
  saveGameData();
});

// Handle the "Buy More Cash Per Click" upgrade
upgradeClickButton.addEventListener('click', () => {
  if (score >= upgradeClickCost) {
    score -= upgradeClickCost;
    cashPerClick *= 2;
    upgradeClickCost *= 1.5; // Increase the cost for the next upgrade
    updateScoreDisplay();
    saveGameData();
    upgradeClickButton.innerText = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
  }
});

// Handle the "Buy More Cash Per Second" upgrade
upgradeAutomaticButton.addEventListener('click', () => {
  if (score >= upgradeAutomaticCost) {
    score -= upgradeAutomaticCost;
    cashPerSecond *= 2;
    upgradeAutomaticCost *= 1.5; // Increase the cost for the next upgrade
    updateScoreDisplay();
    saveGameData();
    upgradeAutomaticButton.innerText = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
  }
});

// Automatic income generation
setInterval(() => {
  score += cashPerSecond;
  updateScoreDisplay();
  saveGameData();
}, 1000);

// Show/hide settings
settingsButton.addEventListener('click', () => {
  document.getElementById('settingsOverlay').style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
  document.getElementById('settingsOverlay').style.display = 'none';
});

// Login/Register buttons
loginRegisterButton.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'flex';
});

closeLoginRegister.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'none';
});

// Login functionality
loginButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (error) {
      alert('Invalid username or password');
      return;
    }

    userData = data;
    alert('Login successful!');
    loginRegisterOverlay.style.display = 'none';
    loadUserData();
  } catch (error) {
    console.error('Error logging in:', error);
  }
});

// Register functionality
registerButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password }])
      .single();

    if (error) {
      alert('Error registering user');
      return;
    }

    alert('Registration successful! Please log in.');
    usernameInput.value = '';
    passwordInput.value = '';
    loginRegisterOverlay.style.display = 'none';
  } catch (error) {
    console.error('Error registering:', error);
  }
});

// Load user data after successful login
async function loadUserData() {
  if (userData) {
    try {
      const { data, error } = await supabase
        .from('game_data')
        .select('*')
        .eq('user_id', userData.id)
        .single();

      if (error) {
        console.log('No game data found for user.');
        return;
      }

      // Update the local game state with the data from Supabase
      score = data.score;
      cashPerClick = data.cash_per_click;
      cashPerSecond = data.cash_per_second;
      updateScoreDisplay();
      saveGameData();
    } catch (error) {
      console.error('Error loading game data:', error);
    }
  }
}

// Sync game data to Supabase when the game is saved
async function saveGameDataToSupabase() {
  if (userData) {
    try {
      const { data, error } = await supabase
        .from('game_data')
        .upsert([{ user_id: userData.id, score, cash_per_click: cashPerClick, cash_per_second: cashPerSecond }])
        .single();

      if (error) {
        console.error('Error saving game data to Supabase:', error);
      }
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  }
}

// Auto-sync data every minute
setInterval(saveGameDataToSupabase, 60000);

// Initialize the game data
loadGameData();
