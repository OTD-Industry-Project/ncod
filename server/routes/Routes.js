const express = require("express");

const router = express.Router();

const apiController = require("../controllers/Controllers");

router.get("/api/address", apiController.getAllAddress);

router.get("/api/address/:id", apiController.getAddressID);

router.get("/api/drivers", apiController.getAllDrivers);

router.get("/api/drivers/:id", apiController.getDriverID);

router.post("/api/drivers/#", apiController.insertDriver);

module.exports = router;