/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

const express = require("express");

const router = express.Router();

//required files
const apiController = require("../controllers/Controllers");
const apiCalls = require("../api/api-calls");

//Calls to controllers
router.get("/api/schedule", apiController.getSchedule);

router.post("/api/history", apiController.getHistory);

//API CALLS
router.get("/api/GetGPSVehicles", apiCalls.GetGPSVehicles);

router.post("/api/GetGPSLocationHistory", apiCalls.GetGPSLocationHistory);

router.get("/api/GetCurrentGPSSnapshot", apiCalls.GetCurrentGPSSnapshot);

router.get("/api/GetScheduledVehicles", apiCalls.GetScheduledVehicles);

router.get("/api/GetScheduledActivity", apiCalls.GetScheduledActivity);


module.exports = router;