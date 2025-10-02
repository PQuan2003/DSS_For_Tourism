const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather_controller");

// Example CRUD endpoints
router.get("/", weatherController.getAllWeather);
router.get("/:id", weatherController.getWeatherByID);

// router.post("/", weatherController.createUser);
// router.put("/:id", weatherController.updateUser);
// router.delete("/:id", weatherController.deleteUser);

module.exports = router;
