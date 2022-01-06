//WORK IN PROGRESS

const express = require("express");

const router = express.Router();

const db = require("../db");

const GetGPSVehicles = async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM vehicles");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                address: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
};

router.get("/api/GetGPSVehicles", GetGPSVehicles);