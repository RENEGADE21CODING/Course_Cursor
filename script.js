// Initial Game Variables
let cash = 0;
let cashPerClick = 0.50; // Initial cash per click
let cashPerSecond = 0.25; // Initial cash per second
let upgradeClickCost = 10.00; // Cost to upgrade cash per click
let upgradeAutomaticCost = 10.00; // Cost to upgrade cash per second
let highestCash = 0; // Track the highest amount of cash saved
let netCash = 0; // Track net cash, does not decrease when cash is spent

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
const loginRegisterButton = document.getElementById('loginRegisterButton');
const loginRegisterOverlay = document.getElementById('loginRegisterOverlay');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const backLoginRegisterButton = document.getElementById('backLoginRegisterButton');

// Update display values
function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
    localStorage.setItem('gameState', JSON.stringify({ cash, cashPerClick, cashPerSecond, upgradeClickCost, upgradeAutomaticCost, highestCash, netCash }));
}

// Handle Cash Click
clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerClick;
    updateDisplay();
    // Pulsing effect
    clickCash.style.transform = 'scale(1.1)';
    setTimeout(() => {
        clickCash.style.transform = 'scale(1)';
    }, 100);
});

// Handle Upgrade Cash Per Click
upgradeClickButton.addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick = Math.ceil(cashPerClick * 1.13 * 100) / 100;
        upgradeClickCost = Math.ceil(upgradeClickCost * 1.15 * 100) / 100;
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
        updateDisplay();
    }
});

// Handle Upgrade Cash Per Second
upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.13 * 100) / 100;
        upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * 1.15 * 100) / 100;
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
        updateDisplay();
    }
});

// Cash increase every second
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

// Open settings overlay
document.getElementById('settingsButton').addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

// Close settings overlay
closeSettings.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

// Open stats overlay
document.getElementById('statsButton').addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
    updateDisplay();
});

// Close stats overlay
closeStats.addEventListener('click', () => {
    statsOverlay.style.display = 'none';
});

// Show reset confirmation overlay
resetProgressButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'flex';
});

// Close reset confirmation overlay
closeResetConfirmation.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

// Confirm reset progress
confirmResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
    cash = 0;
    cashPerClick = 0.50;
    cashPerSecond = 0.25;
    upgradeClickCost = 10.00;
    upgradeAutomaticCost = 10.00;
    highestCash = 0;
    netCash = 0;
    localStorage.removeItem('gameState');
    updateDisplay();
});

// Cancel reset progress
cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

// Show login/register overlay
loginRegisterButton.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'flex';
});

// Close login/register overlay on any button click
loginButton.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'none';
});

registerButton.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'none';
});

backLoginRegisterButton.addEventListener('click', () => {
    loginRegisterOverlay.style.display = 'none';
});

