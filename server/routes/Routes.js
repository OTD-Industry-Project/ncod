const express = require("express");

const router = express.Router();

const apiController = require("../controllers/Controllers");
const apiCalls = require("../api/api-calls");

router.get("/api/schedule", apiController.getSchedule);

router.post("/api/history", apiController.getHistory);

//API CALLS

router.get("/api/GetGPSVehicles", apiCalls.GetGPSVehicles);

router.post("/api/GetGPSLocationHistory", apiCalls.GetGPSLocationHistory);

router.get("/api/GetCurrentGPSSnapshot", apiCalls.GetCurrentGPSSnapshot);

router.get("/api/GetScheduledVehicles", apiCalls.GetScheduledVehicles);

router.get("/api/GetScheduledActivity", apiCalls.GetScheduledActivity);


module.exports = router;