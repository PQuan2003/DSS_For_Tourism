const { POI } = require("../models");

// Get all users
exports.getAllPOI = async (req, res, next) => {
  try {
    const poi = await POI.findAll();

    res.json({
      status: "success",
      content: poi,
    });
  } catch (err) {
    console.error("Error fetching poi:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching pois",
    });
  }
};

// Get user by ID
exports.getPOIById = async (req, res, next) => {
  try {
    const poi = await POI.findByPk(req.params.id);
    res.json({
      status: "success",
      content: poi ? poi : "POI  not found",
    });
  } catch (err) {
    console.error("Error fetching pois:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching poi",
    });
  }
};
