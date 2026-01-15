const express = require("express");
const router = express.Router();
const ResultLController = require("../controllers/result_controller");

// CRUD endpoints
router.get("/", ResultLController.getAllResult);
router.get("/user/:user_id", ResultLController.getResultByUser);
router.get("/today", ResultLController.getAllResultToday);
router.get("/popular", ResultLController.getPopularPlaces);

router.post("/new", ResultLController.createNewResult);

module.exports = router;
