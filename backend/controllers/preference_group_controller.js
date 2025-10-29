const { Preference_Group } = require("../models");

// Get all users
exports.getAllPreferenceGroup = async (req, res, next) => {
  try {
    const preference_group = await Preference_Group.findAll();

    res.json({
      status: "success",
      content: preference_group,
    });
  } catch (err) {
    console.error("Error fetching preference_group:", err);

    res.status(500).json({
      status: "failed",
      content:
        err.message || "Something went wrong while fetching preference_groups",
    });
  }
};

// Get user by ID
exports.getPreferenceGroupByID = async (req, res, next) => {
  try {
    const preference_group = await Preference_Group.findByPk(req.params.id);
    res.json({
      status: "success",
      content: preference_group
        ? preference_group
        : "preference_group  not found",
    });
  } catch (err) {
    console.error("Error fetching preference_groups:", err);

    res.status(500).json({
      status: "failed",
      content:
        err.message || "Something went wrong while fetching preference_group",
    });
  }
};
