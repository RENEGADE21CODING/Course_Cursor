let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;
let highestCash = 0;
let netCash = 0;

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

function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    highestCashDisplay.textContent = highestCash.toFixed(2);
    netCashDisplay.textContent = netCash.toFixed(2);
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
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
        updateDisplay();
    }
});

upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.15 * 100) / 100;
        upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * 1.15 * 100) / 100;
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
        updateDisplay();
    }
});

setInterval(() => {
    cash += cashPerSecond;
    highestCash = Math.max(highestCash, cash);
    netCash += cashPerSecond;
    updateDisplay();
    localStorage.setItem('gameState', JSON.stringify({ cash, cashPerClick, cashPerSecond, upgradeClickCost, upgradeAutomaticCost, highestCash, netCash }));
}, 1000);

window.onload = () => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const state = JSON.parse(savedState);
        cash = state.cash;
        cashPerClick = state.cashPerClick;
        cashPerSecond = state.cashPerSecond;
        upgradeClickCost = state.upgradeClickCost;
        upgradeAutomaticCost = state.upgradeAutomaticCost;
        highestCash = state.highestCash;
        netCash = state.netCash;
        updateDisplay();
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    }
};

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
    localStorage.removeItem('gameState');
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    updateDisplay();
    resetConfirmationOverlay.style.display = 'none';
});

cancelResetButton.addEventListener('click', () => {
    resetConfirmationOverlay.style.display = 'none';
});
