// Initialize Supabase with values from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // URL from the .env file
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // anon key from the .env file
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Variables
let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;
let highestCash = 0;
let netCash = 0;
let totalHoursPlayed = 0;
let userData = null; // User data from Supabase

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

// Update the game display
function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
    hoursPlayedDisplay.textContent = totalHoursPlayed.toFixed(2);
    localStorage.setItem('gameState', JSON.stringify({ cash, cashPerClick, cashPerSecond, upgradeClickCost, upgradeAutomaticCost, highestCash, netCash, totalHoursPlayed }));
}

// Click to earn cash
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

// Upgrade click functionality
upgradeClickButton.addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick = Math.ceil(cashPerClick * 1.15 * 100) / 100;
        upgradeClickCost = Math.ceil(upgradeClickCost * 1.15 * 100) / 100;
        updateDisplay();
    }
});

// Upgrade automatic functionality
upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.15 * 100) / 100;
        upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * 1.15 * 100) / 100;
        updateDisplay();
    }
});

// Automatic cash generation
setInterval(() => {
    cash += cashPerSecond;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerSecond;
    totalHoursPlayed += 1 / 3600; // Update hours played every second
    updateDisplay();
}, 1000);

// Load game data from localStorage or Supabase
function loadGameData() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const { cash: savedCash, cashPerClick: savedCashPerClick, cashPerSecond: savedCashPerSecond, upgradeClickCost: savedUpgradeClickCost, upgradeAutomaticCost: savedUpgradeAutomaticCost, highestCash: savedHighestCash, netCash: savedNetCash, totalHoursPlayed: savedTotalHoursPlayed } = JSON.parse(savedState);
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
}

// Sync game data to Supabase
async function saveGameDataToSupabase() {
    if (userData) {
        try {
            const { data, error } = await supabase
                .from('game_data')
                .upsert([{ user_id: userData.id, score: cash, cash_per_click: cashPerClick, cash_per_second: cashPerSecond }])
                .single();
            if (error) {
                console.error('Error saving game data to Supabase:', error);
            }
        } catch (error) {
            console.error('Error saving game data:', error);
        }
    }
}

// Auto-sync to Supabase every minute
setInterval(saveGameDataToSupabase, 60000);

// Show settings overlay
settingsButton.addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

// Close settings overlay
closeSettings.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

// Show stats overlay
statsButton.addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
    updateDisplay();
});

// Close stats overlay
closeStats.addEventListener('click', () => {
    statsOverlay.style.display = 'none';
});

// Reset progress overlay
resetProgressButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'flex';
});

// Close reset confirmation overlay
closeResetConfirmation.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

// Confirm reset progress
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

// Cancel reset progress
cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

// Initialize the game
window.onload = () => {
    loadGameData();
};
