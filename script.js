// Initialize Supabase
const supabaseUrl = 'https://yesyeuzhiftumudfbsam.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllc3lldXpoaWZ0dW11ZGZic2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5MTI3MjYsImV4cCI6MjA0NjQ4ODcyNn0.xzkxofDA4E9hx3q6O3f4SDd0KK66YrbzqdpOmMzYvpM';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Global user session
let userSession = null;

// Register function
async function registerUser(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error registering:", error.message);
    return;
  }

  console.log("Registration successful:", user);
  loginUser(email, password);  // Automatically log the user in after successful registration
}

// Login function
async function loginUser(email, password) {
  const { user, error } = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error logging in:", error.message);
    return;
  }

  console.log("Login successful:", user);
  userSession = user;  // Store the logged-in user
  getGameData(user.id); // Fetch the user's game data
}

// Fetch user game data
async function getGameData(userId) {
  const { data, error } = await supabase
    .from('game_data')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error("Error fetching game data:", error.message);
    return;
  }

  console.log("Game data:", data);
  updateGameUI(data);  // Update the UI with the fetched data
}

// Update the UI with fetched game data
function updateGameUI(gameData) {
  // Example of updating the UI (you can extend this)
  document.getElementById("scoreDisplay").innerText = `Cash: $${gameData.cash || 0}`;
}

// Event listeners for login and registration buttons
document.getElementById('registerButton').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  registerUser(email, password);
});

document.getElementById('loginButton').addEventListener('click', () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  loginUser(email, password);
});

// Handle session state change (useful for page reloads)
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    console.log("User is logged in:", session.user);
    userSession = session.user;  // Store the logged-in user
    getGameData(session.user.id); // Fetch game data for the logged-in user
  } else {
    console.log("User is logged out.");
    userSession = null;  // Clear session on logout
  }
});
