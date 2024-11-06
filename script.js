// Initialize Supabase client
const supabase = createClient('your-supabase-url', 'your-supabase-anon-key');

// Game variables
let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;
let highestCash = 0;
let netCash = 0;
let totalHoursPlayed = 0;

// DOM Elements
const clickCash = document.getElementById('clickCash');
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickInfo = document.getElementById('clickInfo');
const automaticInfo = document.getElementById('automaticInfo');
const settingsOverlay = document.getElementById('settingsOverlay');
const statsOverlay = document.getElementById('statsOverlay');
const closeSettings = document.getElementById('closeSettings');
const closeStats = document.getElementById('closeStats');
const resetProgressButton = document.getElementById('resetProgressButton');
const resetConfirmationOverlay = document.getElementById('resetConfirmationOverlay');
const closeResetConfirmation = document.getElementById('closeResetConfirmation');
const confirmResetButton = document.getElementById('confirmResetButton');
const cancelResetButton = document.getElementById('cancelResetButton');
const highestCashDisplay = document.getElementById('highestCash');
const netCashDisplay = document.getElementById('netCash');
const hoursPlayedDisplay = document.getElementById('hoursPlayed');
const loginRegisterButton = document.getElementById('loginRegisterButton');
const loginRegisterOverlay = document.getElementById('loginRegisterOverlay');
const closeLoginRegister = document.getElementById('closeLoginRegister');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

// Function to update display and sync with Supabase
function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
    hoursPlayedDisplay.textContent = totalHoursPlayed.toFixed(2);
}

// Register User
async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if (error) {
        alert('Error during registration: ' + error.message);
        return;
    }

    alert('Registration successful! Please check your email for confirmation.');
}

// Login User
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert('Error during login: ' + error.message);
        return;
    }

    alert('Login successful!');
    // Fetch user-related data from the database (e.g., cash, progress)
    const { user } = data;
    const { data: userData, error: userDataError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (userDataError) {
        alert('Error fetching user data: ' + userDataError.message);
        return;
    }

    // Sync user's data with the game
    cash = userData.cash || 0;
    cashPerClick = userData.cashPerClick || 0.50;
    cashPerSecond = userData.cashPerSecond || 0.25;
    upgradeClickCost = userData.upgradeClickCost || 10.00;
    upgradeAutomaticCost = userData.upgradeAutomaticCost || 10.00;
    highestCash = userData.highestCash || 0;
    netCash = userData.netCash || 0;
    totalHoursPlayed = userData.totalHoursPlayed || 0;
    updateDisplay();
}

// Event Listeners for pop-ups
loginRegisterButton.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'flex';
});

closeLoginRegister.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'none';
});

// Login/Register pop-up button functionality
loginButton.addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (email && password) {
        loginUser(email, password);
        loginRegisterOverlay.style.display = 'none';
    } else {
        alert('Please enter both email and password.');
    }
});

registerButton.addEventListener('click', () => {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (email && password) {
        registerUser(email, password);
        loginRegisterOverlay.style.display = 'none';
    } else {
        alert('Please enter both email and password.');
    }
});

// Event listeners for other pop-ups
document.getElementById('settingsButton').addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

document.getElementById('statsButton').addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
    updateDisplay();
});

closeStats.addEventListener('click', () => {
    statsOverlay.style.display = 'none';
});

resetProgressButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'flex';
});

closeResetConfirmation.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

confirmResetButton.addEventListener('click', () => {
    cash = 0;
    cashPerClick = 0.50;
    cashPerSecond = 0.25;
    upgradeClickCost = 10.00;
    upgradeAutomaticCost = 10.00;
    highestCash = 0;
    netCash = 0;
    totalHoursPlayed = 0;

    localStorage.removeItem('gameState');

    updateDisplay();
    resetConfirmationOverlay.style.display = 'none';
});

cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});
