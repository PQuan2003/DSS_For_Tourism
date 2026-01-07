const { Activity } = require("../models");

exports.getAllActivity = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      attributes: ["activity_id", "activity_name"],
      order: [["activity_name", "ASC"]],
    });

    // res.status(200).json(activities ? activities : []);
    return activities ? activities : [];
  } catch (err) {
    console.log("Error fetching activities");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
