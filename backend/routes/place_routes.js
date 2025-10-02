const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place_controller");

// CRUD endpoints
router.get("/", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);

// router.post("/", placeController.createPlace);
// router.put("/:id", placeController.updatePlace);
// router.delete("/:id", placeController.deletePlace);

module.exports = router;
