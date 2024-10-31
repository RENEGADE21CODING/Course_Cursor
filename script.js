// Initial setup for values
let cash = 0;
let cashPerClick = 10; // Starting cash per click
let cashPerSecond = 0.25; // Starting cash per second

// Load saved data or set defaults
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem("platickerProgress")) || {};
    cash = savedProgress.cash || 0;
    cashPerClick = savedProgress.cashPerClick || 10;
    cashPerSecond = savedProgress.cashPerSecond || 0.25;
    updateDisplay();
}

// Update the display with current values
function updateDisplay() {
    document.getElementById("score").innerText = `Cash: $${cash.toFixed(2)}`;
    document.getElementById("currentCashPerClick").innerText = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    document.getElementById("currentCashPerSecond").innerText = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
}

// Function to save progress
function saveProgress() {
    localStorage.setItem("platickerProgress", JSON.stringify({
        cash,
        cashPerClick,
        cashPerSecond
    }));
}

// Cash click functionality
document.getElementById("clickCash").addEventListener("click", () => {
    cash += cashPerClick;
    updateDisplay();
    saveProgress();
});

// Upgrade functions
document.getElementById("buyCashPerClick").addEventListener("click", () => {
    let cost = (cashPerClick * 1.15).toFixed(2); // Cost increases by 15%
    if (cash >= cost) {
        cash -= cost;
        cashPerClick *= 1.1; // Increase cash per click by 10%
        updateDisplay();
        saveProgress();
    }
});

document.getElementById("buyCashPerSecond").addEventListener("click", () => {
    let cost = (10).toFixed(2); // Initial cost for this upgrade
    if (cash >= cost) {
        cash -= cost;
        cashPerSecond *= 1.1; // Increase cash per second by 10%
        updateDisplay();
        saveProgress();
    }
});

// Show and hide popups
function showPopup(popup) {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById(popup).style.display = "block";
}

function hidePopups() {
    document.getElementById("overlay").style.display = "none";
    document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
}

// Event listeners for settings and stats buttons
document.getElementById("settingsButton").addEventListener("click", () => showPopup('settingsPopup'));
document.getElementById("statsButton").addEventListener("click", () => showPopup('statsPopup'));

// Close buttons for popups
document.getElementById("closeSettingsPopup").addEventListener("click", hidePopups);
document.getElementById("closeStatsPopup").addEventListener("click", hidePopups);

// Load progress on startup
loadProgress();

// Increment cash per second
setInterval(() => {
    cash += cashPerSecond;
    updateDisplay();
    saveProgress();
}, 1000);
