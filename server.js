const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Middleware
app.use(cors());
app.use(express.json());


app.post('/api/new_cat', async (req, res) => {
  try {
    const { breed, age } = req.body;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ breed, age })
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/get_cats', async (req, res) => {
  try {

    // Call the Supabase Edge Function for cats
    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});