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
    localStorage.setItem('cash', cash);
    localStorage.setItem('cashPerClick', cashPerClick);
    localStorage.setItem('cashPerSecond', cashPerSecond);
    localStorage.setItem('clickUpgradeCost', clickUpgradeCost);
    localStorage.setItem('autoUpgradeCost', autoUpgradeCost);
}

// Function to load game data
function loadGame() {
    cash = parseFloat(localStorage.getItem('cash')) || 0.00;
    cashPerClick = parseFloat(localStorage.getItem('cashPerClick')) || 0.50;
    cashPerSecond = parseFloat(localStorage.getItem('cashPerSecond')) || 0.25;
    clickUpgradeCost = parseFloat(localStorage.getItem('clickUpgradeCost')) || 10.00;
    autoUpgradeCost = parseFloat(localStorage.getItem('autoUpgradeCost')) || 10.00;

    // Update the UI with loaded values
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${autoUpgradeCost.toFixed(2)})`;
}

// Cash per click function
clickCash.addEventListener('click', () => {
    cash += cashPerClick;
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    saveGame(); // Save game data after each click
});

// Upgrade cash per click function
upgradeClickButton.addEventListener('click', () => {
    if (cash >= clickUpgradeCost) {
        cash -= clickUpgradeCost;
        cashPerClick = Math.ceil(cashPerClick * 1.1 * 100) / 100; // Increase by 10% and round up
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.15 * 100) / 100; // Increase by 15% and round
        clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
        upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
        scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
        saveGame(); // Save game data after each upgrade
    }
});

// Upgrade cash per second function
upgradeAutomaticButton.addEventListener('click', () => {
    if (cash >= autoUpgradeCost) {
        cash -= autoUpgradeCost;
        cashPerSecond = Math.ceil(cashPerSecond * 1.1 * 100) / 100; // Increase by 10% and round up
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.15 * 100) / 100; // Increase by 15% and round
        automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
        upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${autoUpgradeCost.toFixed(2)})`;
        scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
        saveGame(); // Save game data after each upgrade
    }
});

// Auto-increment cash per second
setInterval(() => {
    cash += cashPerSecond;
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    saveGame(); // Save game data on each interval
}, 1000);

// Call loadGame() when the page loads
window.addEventListener('load', loadGame);

// Call saveGame() before the user closes the page
window.addEventListener('beforeunload', saveGame);
