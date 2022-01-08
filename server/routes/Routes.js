const express = require("express");

const router = express.Router();

const apiController = require("../controllers/Controllers");
const apiCalls = require("../api/api-calls");

router.get("/api/address/:id", apiController.getAddressID);

router.get("/api/schedule", apiController.getSchedule);

//API Calls

router.get("/api/GetGPSVehicles", apiCalls.GetGPSVehicles);

router.get("/api/GetScheduledActivity", apiCalls.GetScheduledActivity);




module.exports = router;