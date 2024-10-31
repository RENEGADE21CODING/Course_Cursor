let cash = 0;
let cashPerClick = 0.50; // Set initial cash per click to $0.50
let cashPerSecond = 0.25; // Set initial cash per second to $0.25
let upgradeClickCost = 10.00; // Starting cost set to $10.00
let upgradeAutomaticCost = 10.00; // Starting cost set to $10.00
let highestCash = 0; // New variable to track highest cash saved
let netCash = 0; // New variable to track net cash

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

const increasePercentage = 1.15; // 15% increase factor

function updateDisplay() {
  scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
  clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
  automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
  
  // Update highest cash and net cash display
  highestCash = Math.max(highestCash, cash); // Update highest cash if current cash is greater
  netCash += cash; // Increase net cash with current cash
  document.getElementById('highestCash').textContent = `$${highestCash.toFixed(2)}`;
  document.getElementById('netCash').textContent = `$${netCash.toFixed(2)}`;

  localStorage.setItem('gameState', JSON.stringify({ cash, cashPerClick, cashPerSecond, upgradeClickCost, upgradeAutomaticCost, highestCash, netCash }));
}

clickCash.addEventListener('click', () => {
  cash += cashPerClick;
  updateDisplay();
  // Pulsing effect
  clickCash.style.transform = 'scale(1.1)';
  setTimeout(() => {
    clickCash.style.transform = 'scale(1)';
  }, 100);
});

upgradeClickButton.addEventListener('click', () => {
  if (cash >= upgradeClickCost) {
    cash -= upgradeClickCost;
    cashPerClick = Math.ceil(cashPerClick * increasePercentage * 100) / 100; // Increase by 15%
    upgradeClickCost = Math.ceil(upgradeClickCost * increasePercentage * 100) / 100; // Increase cost by 15%
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    updateDisplay();
  }
});

upgradeAutomaticButton.addEventListener('click', () => {
  if (cash >= upgradeAutomaticCost) {
    cash -= upgradeAutomaticCost;
    cashPerSecond = Math.ceil(cashPerSecond * increasePercentage * 100) / 100; // Increase by 15%
    upgradeAutomaticCost = Math.ceil(upgradeAutomaticCost * increasePercentage * 100) / 100; // Increase cost by 15%
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
    updateDisplay();
  }
});

// Function to increment cash every second
setInterval(() => {
  cash += cashPerSecond;
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
    highestCash = savedHighestCash; // Restore highest cash
    netCash = savedNetCash; // Restore net cash
    updateDisplay();
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
  }
};

// Show settings overlay
document.getElementById('settingsButton').addEventListener('click', () => {
  settingsOverlay.style.display = 'flex';
});

// Close settings overlay
closeSettings.addEventListener('click', () => {
  settingsOverlay.style.display = 'none';
});

// Show stats overlay
document.getElementById('statsButton').addEventListener('click', () => {
  statsOverlay.style.display = 'flex';
});

// Close stats overlay
closeStats.addEventListener('click', () => {
  statsOverlay.style.display = 'none';
});
