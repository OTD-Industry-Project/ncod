const express = require("express");

const router = express.Router();

const apiController = require("../controllers/api");

router.get("/api/address", apiController.getAllAddress);

module.exports = router;