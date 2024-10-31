document.addEventListener("DOMContentLoaded", function() {
  // Variables
  let cash = parseFloat(localStorage.getItem("cash")) || 0.0;
  let cashPerClick = parseFloat(localStorage.getItem("cashPerClick")) || 0.5;
  let cashPerSecond = parseFloat(localStorage.getItem("cashPerSecond")) || 0.25;
  let clickUpgradeCost = parseFloat(localStorage.getItem("clickUpgradeCost")) || 10.0;
  let autoUpgradeCost = parseFloat(localStorage.getItem("autoUpgradeCost")) || 10.0;

  // DOM Elements
  const scoreDisplay = document.getElementById("scoreDisplay");
  const clickInfo = document.getElementById("clickInfo");
  const automaticInfo = document.getElementById("automaticInfo");

  // Update Display
  function updateDisplays() {
    scoreDisplay.textContent = `Cash: $${cash.toFixed(2)}`;
    clickInfo.textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
    automaticInfo.textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
  }
  updateDisplays();

  // Event Listeners for Buttons
  document.getElementById("cashClickImage").addEventListener("click", function() {
    cash += cashPerClick;
    localStorage.setItem("cash", cash);
    updateDisplays();
  });

  document.getElementById("upgradeClickButton").addEventListener("click", function() {
    if (cash >= clickUpgradeCost) {
      cash -= clickUpgradeCost;
      cashPerClick += Math.ceil(cashPerClick * 0.1 * 100) / 100;
      clickUpgradeCost = Math.ceil(clickUpgradeCost * 1.15 * 100) / 100;
      localStorage.setItem("cash", cash);
      localStorage.setItem("cashPerClick", cashPerClick);
      localStorage.setItem("clickUpgradeCost", clickUpgradeCost);
      updateDisplays();
    }
  });

  document.getElementById("upgradeAutomaticButton").addEventListener("click", function() {
    if (cash >= autoUpgradeCost) {
      cash -= autoUpgradeCost;
      cashPerSecond += Math.ceil(cashPerSecond * 0.1 * 100) / 100;
      autoUpgradeCost = Math.ceil(autoUpgradeCost * 1.15 * 100) / 100;
      localStorage.setItem("cash", cash);
      localStorage.setItem("cashPerSecond", cashPerSecond);
      localStorage.setItem("autoUpgradeCost", autoUpgradeCost);
      updateDisplays();
    }
  });

  setInterval(function() {
    cash += cashPerSecond;
    localStorage.setItem("cash", cash);
    updateDisplays();
  }, 1000);

  document.getElementById("resetProgressButton").addEventListener("click", function() {
    cash = 0.0;
    cashPerClick = 0.5;
    cashPerSecond = 0.25;
    clickUpgradeCost = 10.0;
    autoUpgradeCost = 10.0;
    localStorage.setItem("cash", cash);
    localStorage.setItem("cashPerClick", cashPerClick);
    localStorage.setItem("cashPerSecond", cashPerSecond);
    localStorage.setItem("clickUpgradeCost", clickUpgradeCost);
    localStorage.setItem("autoUpgradeCost", autoUpgradeCost);
    updateDisplays();
  });

  document.getElementById("settingsButton").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  });

  document.getElementById("statsButton").addEventListener("click", function() {
    document.getElementById("statsPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  });

  document.getElementById("closeSettingsPopup").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });

  document.getElementById("closeStatsPopup").addEventListener("click", function() {
    document.getElementById("statsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });

  document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("statsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
});
