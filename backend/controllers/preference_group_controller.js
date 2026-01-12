const { where } = require("sequelize");
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
exports.getPreferenceGroupByUserID = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const preference_group = await Preference_Group.findall({
      where: { user_id: req.params.user_id },
    });
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

exports.insertNewPreferenceGroup = async (
  user_id,
  userBudget,
  totalTravelDays,
  user_scenery_requirement,
  user_activity_preference,
  user_weather_preference,
  travel_month,
  weights
) => {
  try {
    const preference_group = await Preference_Group.create({
      user_id,
      preferences: {
        weights,
        budget: userBudget,
        weather: user_weather_preference,
        scenery_requirement: user_scenery_requirement,
        activity_requirement: user_activity_preference,
        total_travel_days: totalTravelDays,
        travel_month,
      },
    });

    return preference_group;
  } catch (err) {
    console.error("Error creating preference_group:", err);
    throw err;
  }
};
