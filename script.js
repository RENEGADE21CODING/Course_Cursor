// Initial Game Variables
let cash = 0;
let cashPerClick = 1.00;
let cashPerSecond = 0.25;
let clickCost = 10.00;
let automaticCost = 10.00;

// Load saved progress from localStorage
function loadProgress() {
  const savedData = localStorage.getItem('platickerData');
  if (savedData) {
    const data = JSON.parse(savedData);
    cash = data.cash || cash;
    cashPerClick = data.cashPerClick || cashPerClick;
    cashPerSecond = data.cashPerSecond || cashPerSecond;
    clickCost = data.clickCost || clickCost;
    automaticCost = data.automaticCost || automaticCost;
  }
}

// Save values to localStorage
function saveProgress() {
  const data = {
    cash,
    cashPerClick,
    cashPerSecond,
    clickCost,
    automaticCost
  };
  localStorage.setItem('platickerData', JSON.stringify(data));
}

// Update display values
function updateDisplay() {
  document.getElementById('scoreDisplay').innerText = `Cash: $${cash.toFixed(2)}`;
  document.getElementById('clickInfo').innerText = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
  document.getElementById('automaticInfo').innerText = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
}

// Cash increment on click
document.getElementById('clickCash').addEventListener('click', function() {
  cash += cashPerClick;
  updateDisplay();
  saveProgress();
});

// Upgrade Cash Per Click
document.getElementById('upgradeClickButton').addEventListener('click', function() {
  if (cash >= clickCost) {
    cash -= clickCost;
    cashPerClick *= 1.10; // Increase by 10%
    clickCost = Math.round(clickCost * 1.15 * 100) / 100; // Increase cost by 15%
    updateDisplay();
    saveProgress();
  }
});

// Upgrade Cash Per Second
document.getElementById('upgradeAutomaticButton').addEventListener('click', function() {
  if (cash >= automaticCost) {
    cash -= automaticCost;
    cashPerSecond *= 1.10; // Increase by 10%
    automaticCost = Math.round(automaticCost * 1.15 * 100) / 100; // Increase cost by 15%
    updateDisplay();
    saveProgress();
  }
});

// Reset Progress
document.getElementById('resetProgressButton').addEventListener('click', function() {
  cash = 0;
  cashPerClick = 10.00;
  cashPerSecond = 0.25;
  clickCost = 10.00;
  automaticCost = 10.00;
  saveProgress();
  updateDisplay();
});

// Update cash per second every second
setInterval(function() {
  cash += cashPerSecond;
  updateDisplay();
  saveProgress();
}, 1000);

// Settings and Stats Popups
const overlay = document.getElementById('overlay');
const settingsPopup = document.getElementById('settingsPopup');
const statsPopup = document.getElementById('statsPopup');

document.getElementById('settingsButton').addEventListener('click', function() {
  overlay.style.display = 'block';
  settingsPopup.style.display = 'block';
});

document.getElementById('closeSettingsPopup').addEventListener('click', function() {
  overlay.style.display = 'none';
  settingsPopup.style.display = 'none';
});

// Stats button
document.getElementById('statsButton').addEventListener('click', function() {
  overlay.style.display = 'block';
  statsPopup.style.display = 'block';
});

document.getElementById('closeStatsPopup').addEventListener('click', function() {
  overlay.style.display = 'none';
  statsPopup.style.display = 'none';
});

// Login/Register Tab functionality
document.getElementById('loginRegisterButton').addEventListener('click', function() {
  const tabs = document.getElementById('loginRegisterTabs');
  tabs.style.display = tabs.style.display === 'block' ? 'none' : 'block';
});

// Tab switching
document.getElementById('loginTab').addEventListener('click', function() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
});

document.getElementById('registerTab').addEventListener('click', function() {
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

// Load initial progress
loadProgress();
updateDisplay();
