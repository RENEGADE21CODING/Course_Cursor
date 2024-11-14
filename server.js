import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Ensure SUPABASE_URL and SUPABASE_ANON_KEY are loaded
console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase Key:", process.env.SUPABASE_ANON_KEY ? "Key loaded" : "No key loaded");

// Check if the necessary environment variables are set
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY. Exiting...");
    process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        return res.json({ success: false, message: error.message });
    }
    res.json({ success: true, user: data.user });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        return res.json({ success: false, message: error.message });
    }
    res.json({ success: true, user: data.user });
});

app.post('/api/saveGameData', async (req, res) => {
    const { user_id, cash, cashPerClick, cashPerSecond, highestCash, netCash, totalHoursPlayed } = req.body;
    const { error } = await supabase.from('game_data').upsert([
        { user_id, cash, cash_per_click: cashPerClick, cash_per_second: cashPerSecond, highest_cash: highestCash, net_cash: netCash, total_hours_played: totalHoursPlayed }
    ]);
    if (error) {
        return res.json({ success: false, message: error.message });
    }
    res.json({ success: true });
});

app.get('/api/loadGameData', async (req, res) => {
    const { user_id } = req.query;
    const { data, error } = await supabase.from('game_data').select('*').eq('user_id', user_id).single();
    if (error) {
        return res.json({ success: false, message: error.message });
    }
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
