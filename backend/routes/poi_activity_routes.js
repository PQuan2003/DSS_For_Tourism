const express = require("express");
const router = express.Router();
const POIActivityController = require("../controllers/poi_activity_controller");

// CRUD endpoints
router.get("/", POIActivityController.getAllPOIActivity);
router.get("/:id", POIActivityController.getPOIActivityById);


module.exports = router;
