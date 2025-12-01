const express = require("express");
const router = express.Router();
const POIController = require("../controllers/poi_controller");

// CRUD endpoints
router.get("/", POIController.getAllPOI);
router.get("/id/:id", POIController.getPOIById);

// router.post("/", POIController.createPlace);
// router.put("/:id", POIController.updatePlace);
// router.delete("/:id", POIController.deletePlace);

module.exports = router;
