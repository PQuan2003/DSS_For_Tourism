const express = require("express");
const router = express.Router();
const placeController = require("../controllers/place_controller");

// CRUD endpoints
router.get("/", placeController.getAllPlaces);
router.get("/filters", placeController.getPlaceFilters);
router.get("/id/:id", placeController.getPlaceById);
router.get("/name/:place", placeController.getPlaceByName);

//Budget Score
router.post("/budget/score/", placeController.calculatedAllPlaceBudgetPoint);
router.post(
  "/budget/score/:place_id",
  placeController.calculateIndividualPlaceBudgetScore
);

//Scenery Score
router.post("/scenery/score/", placeController.calculatedAllPlaceSceneryPoint);
router.post(
  "/scenery/score/:place_id",
  placeController.calculateIndividualPlaceSceneryScore
);

//Activity Score
router.post(
  "/activity/score/",
  placeController.calculatedAllPlaceActivityPoint
);
router.post(
  "/activity/score/:place_id",
  placeController.calculateIndividualPlaceActivityScore
);

router.post("/weather/score/", placeController.calculatedAllPlaceWeatherPoint);
router.post(
  "/weather/score/:place_id",
  placeController.calculateIndividualPlaceWeatherScore
);

// router.post("/", placeController.createPlace);
// router.put("/:id", placeController.updatePlace);
// router.delete("/:id", placeController.deletePlace);

module.exports = router;
