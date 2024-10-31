let cash = 0;
let highestCash = 0; // Highest cash amount
let netCash = 0; // Net cash amount
let cashPerClick = 0.50; // Set initial cash per click to $0.50
let cashPerSecond = 0.25; // Set initial cash per second to $0.25
let upgradeClickCost = 10.00; // Starting cost set to $10.00
let upgradeAutomaticCost = 10.00; // Starting cost set to $10.00

const clickCash = document.getElementById('clickCash');
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickInfo = document.getElementById('clickInfo');
const automaticInfo = document.getElementById('automaticInfo');
const highestCashDisplay = document.getElementById('highestCashDisplay');
const netCashDisplay = document.getElementById('netCashDisplay');
const settingsOverlay = document.getElementById('settingsOverlay');
const statsOverlay = document.getElementById('statsOverlay');
const resetConfirmationOverlay = document.getElementById('resetConfirmationOverlay');
const closeSettings = document.getElementById('closeSettings');
const closeStats = document.getElementById('closeStats');
const closeResetConfirmation = document.getElementById('closeResetConfirmation');
const confirmResetButton = document.getElementById('confirmResetButton');
const cancelResetButton = document.getElementById('cancelResetButton');

function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    
    // Update highest cash if current cash is greater
    if (cash > highestCash) {
        highestCash = cash;
        highestCashDisplay.textContent = `$${highestCash.toFixed(2)}`;
    }

    // Update net cash
    netCash += cash; // Increase net cash with cash earned
    netCashDisplay.textContent = `$${netCash.toFixed(2)}`;
}

clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    updateDisplay();
});

upgradeClickButton.addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick *= 1.15; // Increase by 15%
        upgradeClickCost *= 1.15; // Increase cost by 15%
        updateDisplay();
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    }
});

upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond *= 1.15; // Increase by 15%
        upgradeAutomaticCost *= 1.15; // Increase cost by 15%
        updateDisplay();
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    }
});

setInterval(() => {
    cash += cashPerSecond; // Increase cash every second
    updateDisplay();
}, 1000);

document.getElementById('statsButton').addEventListener('click', () => {
    statsOverlay.style.display = 'flex';
});

document.getElementById('settingsButton').addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

closeSettings.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

closeStats.addEventListener('click', () => {
    statsOverlay.style.display = 'none';
});

document.getElementById('resetProgressButton').addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'flex';
});

closeResetConfirmation.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});

// Add functionality to the Yes button later
confirmResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
    // Implement reset progress logic here
});
