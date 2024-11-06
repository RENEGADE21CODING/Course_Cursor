// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const loginRegisterOverlay = document.getElementById('loginRegisterOverlay');
const closeLoginRegister = document.getElementById('closeLoginRegister');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickCash = document.getElementById('clickCash');
const statsButton = document.getElementById('statsButton');
const settingsButton = document.getElementById('settingsButton');
const closeSettings = document.getElementById('closeSettings');
const levelDesignButton = document.getElementById('levelDesignButton');
const resetProgressButton = document.getElementById('resetProgressButton');

// Initial Game State
const INITIAL_CASH = 0;  // Starting cash value
const INITIAL_CASH_PER_CLICK = 0.5; // Cash earned per click
const INITIAL_CASH_PER_SECOND = 0.25; // Cash earned per second

// Handle Login
loginButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error) {
    alert('Login failed');
  } else {
    alert('Login successful');
    scoreDisplay.textContent = `Cash: $${data.cash}`;
    loginRegisterOverlay.style.display = 'none';
  }
});

// Handle Registration
registerButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const { data, error } = await supabase
    .from('users')
    .insert([
      { username: username, password: password, cash: INITIAL_CASH, cash_per_click: INITIAL_CASH_PER_CLICK, cash_per_second: INITIAL_CASH_PER_SECOND }
    ]);

  if (error) {
    alert('Registration failed');
  } else {
    alert('Registration successful');
    loginRegisterOverlay.style.display = 'none';
  }
});

// Open Login/Register overlay
settingsButton.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'flex';
});

// Close Login/Register overlay
closeLoginRegister.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'none';
});

// Handle Click for Cash
clickCash.addEventListener('click', async () => {
  const username = usernameInput.value;
  
  // Get user data from Supabase
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    alert('Error fetching user data');
    return;
  }

  const newCash = data.cash + data.cash_per_click; // Add cash per click to current cash
  await supabase
    .from('users')
    .update({ cash: newCash })
    .eq('username', username);
  
  scoreDisplay.textContent = `Cash: $${newCash.toFixed(2)}`;
});

// Upgrade Functions (Click per Click & Click per Second)
upgradeClickButton.addEventListener('click', async () => {
  const username = usernameInput.value;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    alert('Error fetching user data');
    return;
  }

  const newCashPerClick = data.cash_per_click + 0.5; // Increase cash per click by 0.5
  await supabase
    .from('users')
    .update({ cash_per_click: newCashPerClick })
    .eq('username', username);

  alert('Cash per Click upgraded!');
});

// Automatic Cash Generation Upgrade
upgradeAutomaticButton.addEventListener('click', async () => {
  const username = usernameInput.value;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error) {
    alert('Error fetching user data');
    return;
  }

  const newCashPerSecond = data.cash_per_second + 0.25; // Increase cash per second by 0.25
  await supabase
    .from('users')
    .update({ cash_per_second: newCashPerSecond })
    .eq('username', username);

  alert('Cash per Second upgraded!');
});

// Open Stats Overlay
statsButton.addEventListener('click', () => {
  alert('Stats view not yet implemented');
});

// Open Settings Overlay
settingsButton.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'flex';
});

// Close Settings Overlay
closeSettings.addEventListener('click', () => {
  loginRegisterOverlay.style.display = 'none';
});

// Reset Game Progress
resetProgressButton.addEventListener('click', async () => {
  const username = usernameInput.value;

  const { data, error } = await supabase
    .from('users')
    .update({ cash: INITIAL_CASH, cash_per_click: INITIAL_CASH_PER_CLICK, cash_per_second: INITIAL_CASH_PER_SECOND })
    .eq('username', username);

  if (error) {
    alert('Error resetting progress');
  } else {
    alert('Progress reset successfully!');
  }
});
