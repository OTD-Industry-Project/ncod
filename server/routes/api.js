const express = require("express");

const router = express.Router();

const apiController = require("../controllers/api");

router.get("/api/address", apiController.getAllAddress);

router.get("/api/address/:id", apiController.getAddressID);

router.get("/api/drivers", apiController.getAllDrivers);

router.get("/api/drivers/:id", apiController.getDriverID);

module.exports = router;