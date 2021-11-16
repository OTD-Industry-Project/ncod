// Express Server

// REQUIRES //
// Express
const express = require("express");

// Import routers
const routes = require("./routes/api");

// Our Database
const db = require("./db");

// dotenv for configuring environment variables
require("dotenv").config();

// Use environment variable if configured, otherwise use port 3000
const PORT = process.env.PORT || 3002;

// Instantiate express app
const app = express();
 
// parses incoming requests with JSON payloads
app.use(express.json());

// To Use the pre-defined routes
app.use('/', routes);


//Get address by ID
app.get("/api/address/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM address WHERE addr_id = $1", [req.params.id]);
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                address: results.rows[0],
            },
        });
    } 
    catch (err) {
        console.log(err);
    }
});


// Run Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
