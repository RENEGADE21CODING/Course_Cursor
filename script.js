let cash = 0.00;
let currentCashPerClick = 0.50;
let currentCashPerSecond = 0.25;
let upgradeClickCost = 10.00;
let upgradeAutomaticCost = 10.00;

// Load saved progress
const loadProgress = () => {
    cash = parseFloat(localStorage.getItem('cash')) || 0.00;
    currentCashPerClick = parseFloat(localStorage.getItem('currentCashPerClick')) || 0.50;
    currentCashPerSecond = parseFloat(localStorage.getItem('currentCashPerSecond')) || 0.25;
    upgradeClickCost = parseFloat(localStorage.getItem('upgradeClickCost')) || 10.00;
    upgradeAutomaticCost = parseFloat(localStorage.getItem('upgradeAutomaticCost')) || 10.00;
    updateDisplay();
};

const updateDisplay = () => {
    document.getElementById('scoreDisplay').innerText = `Cash: $${cash.toFixed(2)}`;
    document.getElementById('clickInfo').innerText = `Current Cash Per Click: $${currentCashPerClick.toFixed(2)}`;
    document.getElementById('automaticInfo').innerText = `Current Cash Per Second: $${currentCashPerSecond.toFixed(2)}`;
    document.getElementById('upgradeClickButton').innerText = `Buy More Cash Per Click (Cost: $${upgradeClickCost.toFixed(2)})`;
    document.getElementById('upgradeAutomaticButton').innerText = `Buy More Cash Per Second (Cost: $${upgradeAutomaticCost.toFixed(2)})`;
};

const saveProgress = () => {
    localStorage.setItem('cash', cash);
    localStorage.setItem('currentCashPerClick', currentCashPerClick);
    localStorage.setItem('currentCashPerSecond', currentCashPerSecond);
    localStorage.setItem('upgradeClickCost', upgradeClickCost);
    localStorage.setItem('upgradeAutomaticCost', upgradeAutomaticCost);
};

// Add cash on click
document.getElementById('clickCash').addEventListener('click', () => {
    cash += currentCashPerClick;
    updateDisplay();
    saveProgress();
});

// Upgrade cash per click
document.getElementById('upgradeClickButton').addEventListener('click', () => {
    if (cash >= upgradeClickCost) {
        cash -= upgradeClickCost;
        currentCashPerClick = parseFloat((currentCashPerClick * 1.10).toFixed(2));
        upgradeClickCost = parseFloat((upgradeClickCost * 1.15).toFixed(2));
        updateDisplay();
        saveProgress();
    }
});

// Upgrade cash per second
document.getElementById('upgradeAutomaticButton').addEventListener('click', () => {
    if (cash >= upgradeAutomaticCost) {
        cash -= upgradeAutomaticCost;
        currentCashPerSecond = parseFloat((currentCashPerSecond * 1.10).toFixed(2));
        upgradeAutomaticCost = parseFloat((upgradeAutomaticCost * 1.15).toFixed(2));
        updateDisplay();
        saveProgress();
    }
});

// Automatic cash increment
setInterval(() => {
    cash += currentCashPerSecond;
    updateDisplay();
    saveProgress();
}, 1000);

// Initialize the game
loadProgress();
