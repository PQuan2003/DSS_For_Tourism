const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather_controller");

// Example CRUD endpoints
router.get("/", weatherController.getAllWeather);
router.get("/:id", weatherController.getWeatherByID);


module.exports = router;
