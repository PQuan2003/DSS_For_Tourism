const { where } = require("sequelize");
const { Weather_Conditions } = require("../models");

// Get all weathers
exports.getAllWeather = async (req, res, next) => {
  try {
    const weathers = await Weather_Conditions.findAll();

    res.json({
      status: "success",
      content: weathers,
    });
  } catch (err) {
    console.error("Error fetching weathers:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching weathers",
    });
  }
};

// Get weather by ID
exports.getWeatherByID = async (req, res, next) => {
  try {
    const weather = await Weather_Conditions.findByPk(req.params.id);
    if (!weather) return res.status(404).json({ error: "weather not found" });
    res.json(weather);
  } catch (err) {
    next(err);
  }
};

exports.getWeatherByPlaceId = async (placeId) => {
  try {
    const weather = await Weather_Conditions.findAll({
      where: {
        place_id: placeId,
      },
    });

    return weather ? weather : [];
  } catch (err) {
    console.log("Error fetching weathers:", err);
  }
};
