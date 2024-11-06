// Initialize Supabase client with your URL and anon key
const supabase = createClient('https://yesyeuzhiftumudfbsam.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3lldXpoaWZ0dW11ZGZic2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTI3MjYsImV4cCI6MjA0NjQ4ODcyNn0.xzkxofDA4E9hx3q6O3f4SDd0KK66YrbzqdpOmMzYvpM');

// Variables for game data (initial values)
let cash = 0;
let cashPerClick = 0.5;
let cashPerSecond = 0.25;
let highestCash = 0;
let netCash = 0;
let totalHoursPlayed = 0;

// Update the game data displayed on the page
function updateDisplay() {
  // Update cash and stats on the page
  document.getElementById('scoreDisplay').textContent = `Cash: $${cash.toFixed(2)}`;
  document.getElementById('clickInfo').textContent = `Current Cash Per Click: $${cashPerClick.toFixed(2)}`;
  document.getElementById('automaticInfo').textContent = `Current Cash Per Second: $${cashPerSecond.toFixed(2)}`;
  document.getElementById('highestCash').textContent = highestCash.toFixed(2);
  document.getElementById('netCash').textContent = netCash.toFixed(2);
  document.getElementById('hoursPlayed').textContent = totalHoursPlayed.toFixed(2);
}

// Increment cash when the user clicks the "click cash" icon
document.getElementById('clickCash').addEventListener('click', () => {
  cash += cashPerClick;
  highestCash = Math.max(cash, highestCash); // Update highest cash
  updateDisplay();
  // Call the Supabase function to update game data in the database
  updateGameData('user-uuid', cash, cashPerClick, cashPerSecond, highestCash, netCash, totalHoursPlayed);
});

// Upgrade cash per click
document.getElementById('upgradeClickButton').addEventListener('click', () => {
  if (cash >= 10) {
    cash -= 10;
    cashPerClick += 0.5;
    updateDisplay();
    updateGameData('user-uuid', cash, cashPerClick, cashPerSecond, highestCash, netCash, totalHoursPlayed);
  }
});

// Upgrade cash per second
document.getElementById('upgradeAutomaticButton').addEventListener('click', () => {
  if (cash >= 10) {
    cash -= 10;
    cashPerSecond += 0.25;
    updateDisplay();
    updateGameData('user-uuid', cash, cashPerClick, cashPerSecond, highestCash, netCash, totalHoursPlayed);
  }
});

// Function to update game data in Supabase (to sync with the database)
async function updateGameData(userId, newCash, newCashPerClick, newCashPerSecond, newHighestCash, newNetCash, newTotalHoursPlayed) {
  const { data, error } = await supabase
    .from('game_data') // Ensure the table name matches
    .upsert([
      {
        user_id: userId,
        cash: newCash,
        cash_per_click: newCashPerClick,
        cash_per_second: newCashPerSecond,
        highest_cash: newHighestCash,
        net_cash: newNetCash,
        total_hours_played: newTotalHoursPlayed,
      }
    ]);

  if (error) {
    console.error("Error updating data:", error);
  } else {
    console.log("Game data updated successfully:", data);
  }
}

// Function to get game data for a user from Supabase
async function getGameData(userId) {
  const { data, error } = await supabase
    .from('game_data') // Ensure the table name matches
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  } else {
    console.log("Game data retrieved:", data);
    return data;
  }
}

// Example function to initialize game data for a new user or when loading game
async function initializeGameData(userId) {
  const gameData = await getGameData(userId);
  if (gameData && gameData.length > 0) {
    const userData = gameData[0];
    // Set the game state to the values from Supabase
    cash = userData.cash;
    cashPerClick = userData.cash_per_click;
    cashPerSecond = userData.cash_per_second;
    highestCash = userData.highest_cash;
    netCash = userData.net_cash;
    totalHoursPlayed = userData.total_hours_played;
    updateDisplay();
  } else {
    // Initialize with default values if no data is found
    cash = 0;
    cashPerClick = 0.5;
    cashPerSecond = 0.25;
    highestCash = 0;
    netCash = 0;
    totalHoursPlayed = 0;
    updateDisplay();
  }
}

// Call the function to initialize game data for a specific user (replace 'user-uuid' with actual user ID)
initializeGameData('user-uuid');

// Periodically update cash based on cash per second
setInterval(() => {
  cash += cashPerSecond;
  highestCash = Math.max(cash, highestCash);
  updateDisplay();
  // Call Supabase to update game data in the background
  updateGameData('user-uuid', cash, cashPerClick, cashPerSecond, highestCash, netCash, totalHoursPlayed);
}, 1000);
