const { Activity } = require("../models");
const { getDistictPlaceTags } = require("./place_controller");
const { getAllActivity } = require("./activity_controller");

exports.getFormInitalData = async (req, res, next) => {
  try {
    const activities = await getAllActivity();
    const tags = await getDistictPlaceTags();
    res.json({
      status: "success",
      available_activities: activities,
      tags: tags,
    });
  } catch (err) {
    console.error("Error fetching activities:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching activities",
    });
  }
};
