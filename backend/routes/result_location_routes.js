const express = require("express");
const router = express.Router();
const ResultLocationController = require("../controllers/result_location_controller");

// CRUD endpoints
router.get("/", ResultLocationController.getAllResultLocation);
router.get("/:id", ResultLocationController.getResultLocationById);

// router.post("/", ResultLocationController.createPlace);
// router.put("/:id", ResultLocationController.updatePlace);
// router.delete("/:id", ResultLocationController.deletePlace);

module.exports = router;
