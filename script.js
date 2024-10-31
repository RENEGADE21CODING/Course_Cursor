// Initialize variables for game state
let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;
let highestCash = 0;
let netCash = 0;

// DOM elements
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
const loginRegisterOverlay = document.getElementById('loginRegisterOverlay');
const loginRegisterButton = document.getElementById('loginRegisterButton');
const closeLoginRegisterButtons = document.querySelectorAll('.closeLoginRegister'); // Select all close buttons
const highestCashDisplay = document.getElementById('highestCash');
const netCashDisplay = document.getElementById('netCash');

// Update game display
function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
    
    // Save game state
    localStorage.setItem('gameState', JSON.stringify({ cash, cashPerClick, cashPerSecond, upgradeClickCost, upgradeAutomaticCost, highestCash, netCash }));
}

// Handle click to increase cash
clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    highestCash = Math.max(highestCash, cash); // Track highest cash
    netCash += cashPerClick; // Net cash should increase with each cash gain
    updateDisplay();

    // Pulse effect for feedback
    clickCash.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clickCash.style.transform = 'scale(1)';
    }, 100);
});

// Handle upgrading cash per click
upgradeClickButton.addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick = Math.ceil(cashPerClick * 1.15 * 100) / 100; // Increase click value by 15%
        upgradeClickCost = Math.ceil(upgradeClickCost * 1.15 * 100) / 100; // Increase cost by 15%
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
        updateDisplay();
    }
});

// Handle upgrading cash per second
upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.15 * 100) / 100; // Increase per-second cash by 15%
        upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * 1.15 * 100) / 100; // Increase cost by 15%
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
        updateDisplay();
    }
});

// Increment cash every second
setInterval(() => {
    cash += cashPerSecond;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerSecond;
    updateDisplay();
}, 1000);

// Load game state from localStorage
window.onload = () => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const { cash: savedCash, cashPerClick: savedCashPerClick, cashPerSecond: savedCashPerSecond, upgradeClickCost: savedUpgradeClickCost, upgradeAutomaticCost: savedUpgradeAutomaticCost, highestCash: savedHighestCash, netCash: savedNetCash } = JSON.parse(savedState);
        cash = savedCash;
        cashPerClick = savedCashPerClick;
        cashPerSecond = savedCashPerSecond;
        upgradeClickCost = savedUpgradeClickCost;
        upgradeAutomaticCost = savedUpgradeAutomaticCost;
        highestCash = savedHighestCash;
        netCash = savedNetCash;
        updateDisplay();
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    }
};

// Open and close Settings
document.getElementById('settingsButton').addEventListener('click', () => settingsOverlay.style.display = 'flex');
closeSettings.addEventListener('click', () => settingsOverlay.style.display = 'none');

// Open and close Stats
document.getElementById('statsButton').addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
    updateDisplay();
});
closeStats.addEventListener('click', () => statsOverlay.style.display = 'none');

// Open and close Reset Confirmation
resetProgressButton.addEventListener('click', () => resetConfirmationOverlay.style.display = 'flex');
closeResetConfirmation.addEventListener('click', () => resetConfirmationOverlay.style.display = 'none');

// Confirm reset progress
confirmResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
    // Clear all saved data
    localStorage.clear();
    cash = 0;
    cashPerClick = 0.50;
    cashPerSecond = 0.25;
    upgradeClickCost = 10.00;
    upgradeAutomaticCost = 10.00;
    highestCash = 0;
    netCash = 0;
    updateDisplay();
});

// Cancel reset progress
cancelResetButton.addEventListener('click', () => resetConfirmationOverlay.style.display = 'none');

// Show Login/Register pop-up
loginRegisterButton.addEventListener('click', () => loginRegisterOverlay.style.display = 'flex');

// Close Login/Register pop-up for all buttons
closeLoginRegisterButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginRegisterOverlay.style.display = 'none';
    });
});
