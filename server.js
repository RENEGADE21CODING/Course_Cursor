// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public')); // Place HTML, CSS, and JS files in a 'public' folder

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

<<<<<<< HEAD
// API routes...
=======
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API route to get game data
>>>>>>> fceefd2a6b35fac0a29d92e0225af9842dbb1298
app.get('/api/game', async (req, res) => {
  const { data, error } = await supabase
    .from('game_data')
    .select('*')
    .eq('user_id', req.query.user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.post('/api/game', async (req, res) => {
  const { user_id, cash, cash_per_click, cash_per_second } = req.body;

  const { data, error } = await supabase
    .from('game_data')
    .upsert([{ user_id, cash, cash_per_click, cash_per_second }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
