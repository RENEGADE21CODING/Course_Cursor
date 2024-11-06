let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;
let highestCash = 0;
let netCash = 0;
let totalHoursPlayed = 0; // Add total hours played stat
let currentUser = null; // To track the logged-in user

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
const emailInput = document.getElementById('emailInput');  // New email input element
const passwordInput = document.getElementById('passwordInput');  // New password input element

// Initialize Supabase client
const { createClient } = supabase;
const supabaseUrl = "https://yesyeuzhiftumudfbsam.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3lldXpoaWZ0dW11ZGZic2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTI3MjYsImV4cCI6MjA0NjQ4ODcyNn0.xzkxofDA4E9hx3q6O3f4SDd0KK66YrbzqdpOmMzYvpM";
const supabase = createClient(supabaseUrl, supabaseKey);

function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
    hoursPlayedDisplay.textContent = totalHoursPlayed.toFixed(2);
    localStorage.setItem('gameState', JSON.stringify({
        cash, cashPerClick, cashPerSecond, 
        upgradeClickCost, upgradeAutomaticCost, 
        highestCash, netCash, totalHoursPlayed
    }));
}

clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerClick;
    updateDisplay();
    clickCash.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clickCash.style.transform = 'scale(1)';
    }, 100);
});

upgradeClickButton.addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick = Math.ceil(cashPerClick * 1.15 * 100) / 100;
        upgradeClickCost = Math.ceil(upgradeClickCost * 1.15 * 100) / 100;
        updateDisplay();
    }
});

upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.15 * 100) / 100;
        upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * 1.15 * 100) / 100;
        updateDisplay();
    }
});

setInterval(() => {
    cash += cashPerSecond;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerSecond;
    totalHoursPlayed += 1 / 3600; // Update hours played every second
    updateDisplay();
}, 1000);

// Event Listeners for login/register
loginButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    
    if (error) {
        alert(`Login failed: ${error.message}`);
    } else {
        currentUser = user;
        loginRegisterOverlay.style.display = 'none';
        alert(`Welcome back, ${user.email}!`);
        loadUserGameData(user.id); // Load the saved game data after login
    }
});

registerButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const { user, error } = await supabase.auth.signUp({
        email,
        password
    });
    
    if (error) {
        alert(`Registration failed: ${error.message}`);
    } else {
        currentUser = user;
        loginRegisterOverlay.style.display = 'none';
        alert(`Welcome, ${user.email}! You are now registered.`);
    }
});

async function loadUserGameData(userId) {
    const { data, error } = await supabase
        .from('game_data')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching game data:', error.message);
    } else {
        if (data) {
            cash = data.cash || 0;
            cashPerClick = data.cash_per_click || 0.50;
            cashPerSecond = data.cash_per_second || 0.25;
            upgradeClickCost = data.upgrade_click_cost || 10.00;
            upgradeAutomaticCost = data.upgrade_automatic_cost || 10.00;
            highestCash = data.highest_cash || 0;
            netCash = data.net_cash || 0;
            totalHoursPlayed = data.total_hours_played || 0;
            updateDisplay();
        }
    }
}

async function saveUserGameData() {
    if (!currentUser) return;

    const { error } = await supabase
        .from('game_data')
        .upsert({
            user_id: currentUser.id,
            cash,
            cash_per_click: cashPerClick,
            cash_per_second: cashPerSecond,
            upgrade_click_cost: upgradeClickCost,
            upgrade_automatic_cost: upgradeAutomaticCost,
            highest_cash: highestCash,
            net_cash: netCash,
            total_hours_played: totalHoursPlayed
        });

    if (error) {
        console.error('Error saving game data:', error.message);
    }
}

window.onload = () => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const { 
            cash: savedCash, 
            cashPerClick: savedCashPerClick, 
            cashPerSecond: savedCashPerSecond, 
            upgradeClickCost: savedUpgradeClickCost, 
            upgradeAutomaticCost: savedUpgradeAutomaticCost, 
            highestCash: savedHighestCash, 
            netCash: savedNetCash, 
            totalHoursPlayed: savedTotalHoursPlayed 
        } = JSON.parse(savedState);

        cash = savedCash;
        cashPerClick = savedCashPerClick;
        cashPerSecond = savedCashPerSecond;
        upgradeClickCost = savedUpgradeClickCost;
        upgradeAutomaticCost = savedUpgradeAutomaticCost;
        highestCash = savedHighestCash;
        netCash = savedNetCash;
        totalHoursPlayed = savedTotalHoursPlayed;
        updateDisplay();
    }
};

// Event Listeners for pop-ups
document.getElementById('settingsButton').addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

document.getElementById('statsButton').addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
});

closeStats.addEventListener('click', () => {
    statsOverlay.style.display = 'none';
});

// Reset game progress confirmation
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
    updateDisplay();
    resetConfirmationOverlay.style.display = 'none';
});

cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

setInterval(saveUserGameData, 10000); // Save game data to Supabase every 10 seconds
