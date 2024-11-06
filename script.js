// Assuming you're using environment variables in your build process
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Example function for user registration
async function signUpUser(username, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    console.error("Sign Up Error:", error.message);
  } else {
    console.log("User Signed Up:", data);
    // After signing up, you can store the username in your database
    // or perform other actions.
  }
}

// Example function for user login
async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error("Login Error:", error.message);
  } else {
    console.log("User Logged In:", data);
  }
}

// Function to create game data for a user
async function createGameData(userId) {
  const { data, error } = await supabase
    .from('game_data')
    .insert([
      {
        user_id: userId,
        cash: 0,
        score: 0,
        highest_score: 0,
      }
    ]);

  if (error) {
    console.error("Error creating game data:", error.message);
  } else {
    console.log("Game Data Created:", data);
  }
}

// Function to update game data (like cash, score, etc.)
async function updateGameData(userId, newCash, newScore) {
  const { data, error } = await supabase
    .from('game_data')
    .update({ cash: newCash, score: newScore })
    .eq('user_id', userId);

  if (error) {
    console.error("Error updating game data:", error.message);
  } else {
    console.log("Game Data Updated:", data);
  }
}

// Function to fetch game data for a user
async function fetchGameData(userId) {
  const { data, error } = await supabase
    .from('game_data')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching game data:", error.message);
  } else {
    console.log("Fetched Game Data:", data);
    return data[0]; // Assuming only one row of game data per user
  }
}

// Example function to handle user sign-up on form submit
document.getElementById('registerButton').addEventListener('click', async () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const username = document.getElementById('usernameInput').value;

  await signUpUser(username, email, password);
  // After sign-up, create game data for the user
  const user = supabase.auth.user(); // Get the current logged-in user
  if (user) {
    await createGameData(user.id);
  }
});

// Example function to handle user login
document.getElementById('loginButton').addEventListener('click', async () => {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  await loginUser(email, password);
  // After login, fetch game data for the user
  const user = supabase.auth.user();
  if (user) {
    const gameData = await fetchGameData(user.id);
    if (gameData) {
      console.log("Game Data:", gameData);
    }
  }
});

// Function to handle user logout
document.getElementById('logoutButton').addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error:", error.message);
  } else {
    console.log("User Logged Out");
  }
});

// Event listener to trigger login/register overlay
document.getElementById('loginRegisterButton').addEventListener('click', () => {
  document.getElementById('loginRegisterOverlay').style.display = 'flex';
});

// Close login/register overlay
document.getElementById('closeLoginRegister').addEventListener('click', () => {
  document.getElementById('loginRegisterOverlay').style.display = 'none';
});

// Additional functionality like level creation and progress resets would go here
