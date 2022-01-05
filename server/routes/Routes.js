const express = require("express");

const router = express.Router();

const apiController = require("../controllers/Controllers");

router.get("/api/address", apiController.getAllAddress);

router.get("/api/address/:id", apiController.getAddressID);


module.exports = router;