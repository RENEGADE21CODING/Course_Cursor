document.addEventListener("DOMContentLoaded", function() {
  // Hide popups initially
  document.getElementById("settingsPopup").style.display = "none";
  document.getElementById("statsPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  
  // Close buttons
  document.getElementById("closeSettingsPopup").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });

  document.getElementById("closeStatsPopup").addEventListener("click", function() {
    document.getElementById("statsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });

  // Open settings popup
  document.getElementById("settingsButton").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  });

  // Open stats popup
  document.getElementById("statsButton").addEventListener("click", function() {
    document.getElementById("statsPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  });

  // Overlay click to close popups
  document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("statsPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });
});
