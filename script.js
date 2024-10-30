// Variables for cash and upgrades
let cash = 0.00;
let cashPerClick = 0.50;
let cashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;

// Load saved values from local storage
function loadProgress() {
    cash = parseFloat(localStorage.getItem('cash')) || 0;
    cashPerClick = parseFloat(localStorage.getItem('cashPerClick')) || 0.50;
    cashPerSecond = parseFloat(localStorage.getItem('cashPerSecond')) || 0.25;
    upgradeClickCost = parseFloat(localStorage.getItem('upgradeClickCost')) || 10.00;
    upgradeAutomaticCost = parseFloat(localStorage.getItem('upgradeAutomaticCost')) || 10.00;
}

// Save values to local storage
function saveProgress() {
    localStorage.setItem('cash', cash);
    localStorage.setItem('cashPerClick', cashPerClick);
    localStorage.setItem('cashPerSecond', cashPerSecond);
    localStorage.setItem('upgradeClickCost', upgradeClickCost);
    localStorage.setItem('upgradeAutomaticCost', upgradeAutomaticCost);
}

// Update the cash display
function updateDisplay() {
    document.getElementById('scoreDisplay').innerText = `Cash: $${cash.toFixed(2)}`;
    document.getElementById('clickInfo').innerText = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    document.getElementById('automaticInfo').innerText = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    document.getElementById('upgradeClickButton').innerText = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    document.getElementById('upgradeAutomaticButton').innerText = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
}

// Click cash function
document.getElementById('clickCash').addEventListener('click', () => {
    cash += cashPerClick;
    updateDisplay();
    saveProgress();
});

// Upgrade buttons
document.getElementById('upgradeClickButton').addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        cashPerClick *= 1.10; // Increase by 10%
        upgradeClickCost = Math.round(upgradeClickCost * 1.15 * 100) / 100; // Increase cost by 15%
        updateDisplay();
        saveProgress();
    }
});

document.getElementById('upgradeAutomaticButton').addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        cashPerSecond *= 1.10; // Increase by 10%
        upgradeAutomaticCost = Math.round(upgradeAutomaticCost * 1.15 * 100) / 100; // Increase cost by 15%
        updateDisplay();
        saveProgress();
    }
});

// Automatic cash increment
setInterval(() => {
    cash += cashPerSecond;
    updateDisplay();
    saveProgress();
}, 1000);

// Popup handling
const settingsButton = document.getElementById('settingsButton');
const overlay = document.getElementById('overlay');
const settingsPopup = document.getElementById('settingsPopup');
const closeSettingsPopup = document.getElementById('closeSettingsPopup');
const loginRegisterButton = document.querySelector('.login-register');
const statsButton = document.getElementById('statsButton');
const closeStatsPopup = document.getElementById('closeStatsPopup');
const statsPopup = document.getElementById('statsPopup');

// Open settings popup
settingsButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    settingsPopup.style.display = 'block';
});

// Close settings popup
closeSettingsPopup.addEventListener('click', () => {
    overlay.style.display = 'none';
    settingsPopup.style.display = 'none';
});

// Open stats popup
statsButton.addEventListener('click', () => {
    overlay.style.display = 'block';
    statsPopup.style.display = 'block';
});

// Close stats popup
closeStatsPopup.addEventListener('click', () => {
    overlay.style.display = 'none';
    statsPopup.style.display = 'none';
});

// Login/Register functionality
let isLoginTab = true; // Tracks current tab
const tabContainer = document.createElement('div');
tabContainer.classList.add('tab-container');

const loginTab = document.createElement('div');
loginTab.classList.add('tab');
loginTab.innerText = 'Login';
loginTab.addEventListener('click', () => {
    isLoginTab = true;
    updateTabVisibility();
});

const registerTab = document.createElement('div');
registerTab.classList.add('tab');
registerTab.innerText = 'Register';
registerTab.addEventListener('click', () => {
    isLoginTab = false;
    updateTabVisibility();
});

tabContainer.appendChild(loginTab);
tabContainer.appendChild(registerTab);
settingsPopup.appendChild(tabContainer);

// Create form elements
const form = document.createElement('form');
form.classList.add('form');

const usernameInput = document.createElement('input');
usernameInput.type = 'text';
usernameInput.placeholder = 'Username';
form.appendChild(usernameInput);

const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.placeholder = 'Password';
form.appendChild(passwordInput);

const captchaDiv = document.createElement('div');
captchaDiv.classList.add('captcha');
captchaDiv.innerText = 'I am not a robot (CAPTCHA here)';
form.appendChild(captchaDiv);

// Add the form to the settings popup
settingsPopup.appendChild(form);

// Function to update the visibility of the tabs
function updateTabVisibility() {
    if (isLoginTab) {
        loginTab.style.backgroundColor = '#007bff'; // Active tab color
        registerTab.style.backgroundColor = '#0056b3'; // Inactive tab color
        passwordInput.placeholder = 'Password'; // Login
    } else {
        registerTab.style.backgroundColor = '#007bff'; // Active tab color
        loginTab.style.backgroundColor = '#0056b3'; // Inactive tab color
        passwordInput.placeholder = 'Confirm Password'; // Register
    }
}

// Initialize
loadProgress();
updateDisplay();
updateTabVisibility();
