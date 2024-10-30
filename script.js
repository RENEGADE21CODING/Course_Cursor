// Variables for cash and upgrade costs
let cash = 0.00;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let clickUpgradeCost = 10.00;
let autoUpgradeCost = 10.00;

// Elements
const scoreDisplay = document.getElementById('scoreDisplay');
const clickInfo = document.getElementById('clickInfo');
const automaticInfo = document.getElementById('automaticInfo');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickCash = document.getElementById('clickCash');

// Function to save game data
function saveGame() {
    localStorage.setItem('cash', cash.toFixed(2));
    localStorage.setItem('cashPerClick', cashPerClick.toFixed(2));
    localStorage.setItem('cashPerSecond', cashPerSecond.toFixed(2));
    localStorage.setItem('clickUpgradeCost', clickUpgradeCost.toFixed(2));
    localStorage.setItem('autoUpgradeCost', autoUpgradeCost.toFixed(2));
}

// Function to load game data
function loadGame() {
    cash = parseFloat(localStorage.getItem('cash')) || 0.00;
    cashPerClick = parseFloat(localStorage.getItem('cashPerClick')) || 0.50;
    cashPerSecond = parseFloat(localStorage.getItem('cashPerSecond')) || 0.25;
    clickUpgradeCost = parseFloat(localStorage.getItem('clickUpgradeCost')) || 10.00;
    autoUpgradeCost = parseFloat(localStorage.getItem('autoUpgradeCost')) || 10.00;

    updateUI(); // Call the function to update the UI
}

// Function to update UI elements
function updateUI() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${autoUpgradeCost.toFixed(2)})`;
}

// Cash per click function
clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    updateUI(); // Update UI
    saveGame(); // Save game data after each click
});

// Upgrade cash per click function
upgradeClickButton.addEventListener('click', () => {
    if (cash >= clickUpgradeCost) {
        cash -= clickUpgradeCost;
        cashPerClick = Math.ceil(cashPerClick * 1.1 * 100) / 100; // Increase by 10% and round up
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.15 * 100) / 100; // Increase by 15% and round
        updateUI(); // Update UI
        saveGame(); // Save game data after upgrade
    }
});

// Upgrade cash per second function
upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= autoUpgradeCost) {
        cash -= autoUpgradeCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.1 * 100) / 100; // Increase by 10% and round up
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.15 * 100) / 100; // Increase by 15% and round
        updateUI(); // Update UI
        saveGame(); // Save game data after upgrade
    }
});

// Auto-increment cash per second
setInterval(() => {
    cash += cashPerSecond;
    updateUI(); // Update UI
    saveGame(); // Save game data every second
}, 1000);

// Reset Progress functionality
document.getElementById('resetProgressButton').addEventListener('click', () => {
    cash = 0.00;
    cashPerClick = 0.50;
    cashPerSecond = 0.25;
    clickUpgradeCost = 10.00;
    autoUpgradeCost = 10.00;

    updateUI(); // Update UI with reset values
    localStorage.clear(); // Clear saved data
});

// Load the game when the page is loaded
window.onload = loadGame;

// Settings Popup Logic
const settingsButton = document.getElementById('settingsButton');
const settingsPopup = document.getElementById('settingsPopup');
const overlay = document.getElementById('overlay');
const closeSettingsPopup = document.getElementById('closeSettingsPopup');

settingsButton.addEventListener('click', () => {
    settingsPopup.style.display = 'block';
    overlay.style.display = 'block';
});

closeSettingsPopup.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
    overlay.style.display = 'none';
});

// Stats Popup Logic
const statsButton = document.getElementById('statsButton');
const statsPopup = document.getElementById('statsPopup');
const closeStatsPopup = document.getElementById('closeStatsPopup');

statsButton.addEventListener('click', () => {
    statsPopup.style.display = 'block';
    overlay.style.display = 'block';
});

closeStatsPopup.addEventListener('click', () => {
    statsPopup.style.display = 'none';
    overlay.style.display = 'none';
});
