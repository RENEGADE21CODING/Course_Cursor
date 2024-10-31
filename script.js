// Initialize saved values or set default values
let cash = parseFloat(localStorage.getItem('cash')) || 0;
let cashPerClick = parseFloat(localStorage.getItem('cashPerClick')) || 0.50;
let cashPerSecond = parseFloat(localStorage.getItem('cashPerSecond')) || 0.25;
let clickUpgradeCost = parseFloat(localStorage.getItem('clickUpgradeCost')) || 10.00;
let automaticUpgradeCost = parseFloat(localStorage.getItem('automaticUpgradeCost')) || 10.00;

// Display cash amount
const scoreDisplay = document.getElementById('scoreDisplay');
scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;

// Function to update cash display
function updateDisplay() {
  scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
}

// Cash click event
const clickCash = document.getElementById('clickCash');
clickCash.addEventListener('click', () => {
  cash += cashPerClick;
  updateDisplay();
});

// Upgrade buttons
const upgradeClickButton = document.getElementById('upgradeClickButton');
upgradeClickButton.addEventListener('click', () => {
  if (cash >= clickUpgradeCost) {
    cash -= clickUpgradeCost;
    cashPerClick *= 1.1; // Increase cash per click by 10%
    clickUpgradeCost = Math.round(clickUpgradeCost * 1.15 * 100) / 100; // Increase cost by 15%
    updateDisplay();
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
  }
});

const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
upgradeAutomaticButton.addEventListener('click', () => {
  if (cash >= automaticUpgradeCost) {
    cash -= automaticUpgradeCost;
    cashPerSecond *= 1.1; // Increase cash per second by 10%
    automaticUpgradeCost = Math.round(automaticUpgradeCost * 1.15 * 100) / 100; // Increase cost by 15%
    updateDisplay();
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${automaticUpgradeCost.toFixed(2)})`;
  }
});

// Automatic cash generation
setInterval(() => {
  cash += cashPerSecond;
  updateDisplay();
}, 1000);

// Reset progress function
const resetProgressButton = document.getElementById('resetProgressButton');
resetProgressButton.addEventListener('click', () => {
  cash = 0;
  cashPerClick = 0.50;
  cashPerSecond = 0.25;
  clickUpgradeCost = 10.00;
  automaticUpgradeCost = 10.00;
  localStorage.clear(); // Clear saved data
  updateDisplay();
});

// Function to close popups
function closePopups() {
  document.getElementById('settingsPopup').style.display = 'none';
  document.getElementById('statsPopup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Event listeners for buttons
const statsButton = document.getElementById('statsButton');
statsButton.addEventListener('click', () => {
  closePopups();
  document.getElementById('statsPopup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
});

const settingsButton = document.getElementById('settingsButton');
settingsButton.addEventListener('click', () => {
  closePopups();
  document.getElementById('settingsPopup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
});

document.getElementById('closeSettingsPopup').addEventListener('click', closePopups);
document.getElementById('closeStatsPopup').addEventListener('click', closePopups);

// Close popups when loading
closePopups();
