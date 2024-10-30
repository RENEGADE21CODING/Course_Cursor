// Variables for cash and upgrade costs
let cash = 0.00;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let clickUpgradeCost = 10.00;
let autoUpgradeCost = 10.00;

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
    document.getElementById('scoreDisplay').textContent = `Cash: $${cash.toFixed(2)}`;
    document.getElementById('clickInfo').textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    document.getElementById('automaticInfo').textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    document.getElementById('upgradeClickButton').textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
    document.getElementById('upgradeAutomaticButton').textContent = `Buy More Cash Per Second (Cost: $${autoUpgradeCost.toFixed(2)})`;
}

// Call loadGame() when the page loads
window.addEventListener('load', loadGame);

// Call saveGame() before the user closes the page
window.addEventListener('beforeunload', saveGame);
