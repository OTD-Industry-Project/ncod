// Express Server

// REQUIRES //
// Express
const express = require("express");

// Our Database
const db = require("./db");

// dotenv for configuring environment variables
require("dotenv").config();

// Use environment variable if configured, otherwise use port 3000
const PORT = process.env.PORT || 3001;

// Instantiate express app
const app = express();

// ROUTES
app.get("/api", async (req, res) => {
    const data = await db.query("SELECT * FROM rnc_database");
    const { rows: [{ id, timestamp }] } = data;

    res.json({message: `id: ${id} timestamp: ${timestamp}`});
});

// Run Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
