const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API route to get game data
app.get('/api/game', async (req, res) => {
  const { data, error } = await supabase
    .from('game_data')
    .select('*')
    .eq('user_id', req.query.user_id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// API route to save game data
app.post('/api/game', async (req, res) => {
  const { user_id, cash, cash_per_click, cash_per_second } = req.body;

  const { data, error } = await supabase
    .from('game_data')
    .upsert([{ user_id, cash, cash_per_click, cash_per_second }]);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
