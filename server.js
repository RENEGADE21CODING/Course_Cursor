const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public')); // Place HTML, CSS, and JS files in a 'public' folder

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// API routes...
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
