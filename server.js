const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// post cat
app.post("/api/new_cat", async (req, res) => {
  try {
    const { breed, description, temperament, hypoallergenic, image_url } =
      req.body;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        breed,
        description,
        temperament,
        hypoallergenic,
        image_url,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    console.error("POST request error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get all cats
app.get("/api/get_cats", async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("GET request error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get single cat by breed
app.get("/api/get_cat/:id", async (req, res) => {
  try {
    const catId = parseInt(req.params.id, 10);

    if (isNaN(catId)) {
      return res.status(400).json({ error: "Invalid cat ID" });
    }

    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    const cat = data.find((cat) => cat.id === catId);

    if (!cat) {
      return res.status(404).json({ error: "Cat not found" });
    }

    res.json(cat);
  } catch (error) {
    console.error("GET single cat request error:", error);
    res.status(500).json({ error: error.message });
  }
});

// edit cat by ID
app.put("/api/edit_cat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { breed, description, temperament, hypoallergenic, image_url } =
      req.body;

    const parsedId = parseInt(req.params.id, 10);

    if (!parsedId || isNaN(parsedId)) {
      return res.status(400).json({ error: "Missing or invalid cat ID." });
    }

    // Fetch call to Supabase
    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        id: parsedId,
        breed,
        description,
        temperament,
        hypoallergenic,
        image_url,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json({ success: true, message: "Cat updated successfully", data });
  } catch (error) {
    console.error("PUT request error:", error);
    res.status(500).json({ error: error.message });
  }
});

// delete cat by ID

app.delete("/api/delete_cat/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/cats`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(
        `Supabase returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("POST request error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
