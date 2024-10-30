let cash = 0;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;

const clickCash = document.getElementById('clickCash');
const scoreDisplay = document.getElementById('scoreDisplay');
const upgradeClickButton = document.getElementById('upgradeClickButton');
const upgradeAutomaticButton = document.getElementById('upgradeAutomaticButton');
const clickInfo = document.getElementById('clickInfo');
const automaticInfo = document.getElementById('automaticInfo');
const settingsPopup = document.getElementById('settingsPopup');
const statsPopup = document.getElementById('statsPopup');
const overlay = document.getElementById('overlay');

function updateDisplay() {
  scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
  clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
  automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
}

clickCash.addEventListener('click', () => {
  cash += cashPerClick;
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
  updateDisplay();
}, 1000);

document.getElementById('settingsButton').addEventListener('click', () => {
  settingsPopup.style.display = 'block';
  overlay.style.display = 'block';
});

document.getElementById('closeSettingsPopup').addEventListener('click', () => {
  settingsPopup.style.display = 'none';
  overlay.style.display = 'none';
});

document.getElementById('statsButton').addEventListener('click', () => {
  statsPopup.style.display = 'block';
  overlay.style.display = 'block';
});

document.getElementById('closeStatsPopup').addEventListener('click', () => {
  statsPopup.style.display = 'none';
  overlay.style.display = 'none';
});

document.getElementById('resetProgressButton').addEventListener('click', () => {
  cash = 0;
  cashPerClick = 0.50;
  cashPerSecond = 0.25;
  upgradeClickCost = 10.00;
  upgradeAutomaticCost = 10.00;
  localStorage.clear();
  updateDisplay();
  settingsPopup.style.display = 'none';
  overlay.style.display = 'none';
});
