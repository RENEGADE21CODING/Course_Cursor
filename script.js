document.addEventListener("DOMContentLoaded", () => {
  // Cash, click, and automatic upgrade elements
  const scoreDisplay = document.getElementById("scoreDisplay");
  const clickInfo = document.getElementById("clickInfo");
  const automaticInfo = document.getElementById("automaticInfo");
  const clickCash = document.getElementById("clickCash");

  // Upgrade buttons
  const upgradeClickButton = document.getElementById("upgradeClickButton");
  const upgradeAutomaticButton = document.getElementById("upgradeAutomaticButton");

  // Popups and overlay
  const settingsPopup = document.getElementById("settingsPopup");
  const statsPopup = document.getElementById("statsPopup");
  const overlay = document.getElementById("overlay");

  // Popup close buttons
  const closeSettingsPopup = document.getElementById("closeSettingsPopup");
  const closeStatsPopup = document.getElementById("closeStatsPopup");

  // Game data
  let cash = parseFloat(localStorage.getItem("cash")) || 0.0;
  let cashPerClick = parseFloat(localStorage.getItem("cashPerClick")) || 0.5;
  let cashPerSecond = parseFloat(localStorage.getItem("cashPerSecond")) || 0.25;
  let clickUpgradeCost = parseFloat(localStorage.getItem("clickUpgradeCost")) || 10.0;
  let automaticUpgradeCost = parseFloat(localStorage.getItem("automaticUpgradeCost")) || 10.0;

  // Display initial values
  updateDisplay();

  // Click event for cash generation
  clickCash.addEventListener("click", () => {
    cash += cashPerClick;
    saveProgress();
    updateDisplay();
  });

  // Upgrade buttons event listeners
  upgradeClickButton.addEventListener("click", () => {
    if (cash >= clickUpgradeCost) {
      cash -= clickUpgradeCost;
      cashPerClick = Math.ceil((cashPerClick * 1.1) * 100) / 100;
      clickUpgradeCost = Math.ceil((clickUpgradeCost * 1.15) * 100) / 100;
      saveProgress();
      updateDisplay();
    }
  });

  upgradeAutomaticButton.addEventListener("click", () => {
    if (cash >= automaticUpgradeCost) {
      cash -= automaticUpgradeCost;
      cashPerSecond = Math.ceil((cashPerSecond * 1.1) * 100) / 100;
      automaticUpgradeCost = Math.ceil((automaticUpgradeCost * 1.15) * 100) / 100;
      saveProgress();
      updateDisplay();
    }
  });

  // Auto-increment cash per second
  setInterval(() => {
    cash += cashPerSecond;
    saveProgress();
    updateDisplay();
  }, 1000);

  // Open settings popup
  document.getElementById("settingsButton").addEventListener("click", () => {
    settingsPopup.style.display = "block";
    overlay.style.display = "block";
  });

  // Open stats popup
  document.getElementById("statsButton").addEventListener("click", () => {
    statsPopup.style.display = "block";
    overlay.style.display = "block";
  });

  // Close settings popup
  closeSettingsPopup.addEventListener("click", () => {
    settingsPopup.style.display = "none";
    overlay.style.display = "none";
  });

  // Close stats popup
  closeStatsPopup.addEventListener("click", () => {
    statsPopup.style.display = "none";
    overlay.style.display = "none";
  });

  // Close popup by clicking on overlay
  overlay.addEventListener("click", () => {
    settingsPopup.style.display = "none";
    statsPopup.style.display = "none";
    overlay.style.display = "none";
  });

  // Function to update the display values
  function updateDisplay() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
    upgradeClickButton.textContent = `Buy More Cash Per Click (Cost: $${clickUpgradeCost.toFixed(2)})`;
    upgradeAutomaticButton.textContent = `Buy More Cash Per Second (Cost: $${automaticUpgradeCost.toFixed(2)})`;
  }

  // Save game progress to local storage
  function saveProgress() {
    localStorage.setItem("cash", cash.toString());
    localStorage.setItem("cashPerClick", cashPerClick.toString());
    localStorage.setItem("cashPerSecond", cashPerSecond.toString());
    localStorage.setItem("clickUpgradeCost", clickUpgradeCost.toString());
    localStorage.setItem("automaticUpgradeCost", automaticUpgradeCost.toString());
  }
});
