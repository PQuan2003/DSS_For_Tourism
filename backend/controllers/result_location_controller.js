const { Result_Location } = require("../models");

// Get all users
exports.getAllResultLocation = async (req, res, next) => {
  try {
    const result_location = await Result_Location.findAll();

    res.json({
      status: "success",
      content: result_location,
    });
  } catch (err) {
    console.error("Error fetching result_location:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching result_locations",
    });
  }
};

// Get user by ID
exports.getResultLocationById = async (req, res, next) => {
  try {
    const result_location = await Result_Location.findByPk(req.params.id);
    res.json({
      status: "success",
      content: result_location ? result_location : "result_location  not found",
    });
  } catch (err) {
    console.error("Error fetching result_locations:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching result_location",
    });
  }
};
