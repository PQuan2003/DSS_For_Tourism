const { POI_Activity } = require("../models");

exports.getAllPOIActivity = async (req, res, next) => {
  try {
    const poi_activities = await POI_Activity.findAll();

    res.json({
      status: "success",
      content: poi_activities,
    });
  } catch (err) {
    console.error("Error fetching poi_activities:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching poi_activities",
    });
  }
};

// Get user by ID
exports.getPOIActivityById = async (req, res, next) => {
  try {
    const poi_activities = await POI_Activity.findByPk(req.params.id);
    res.json({
      status: "success",
      content: poi_activities ? poi_activities : "POI Activity not found",
    });
  } catch (err) {
    console.error("Error fetching poi_activitiess:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching poi_activities",
    });
  }
};
