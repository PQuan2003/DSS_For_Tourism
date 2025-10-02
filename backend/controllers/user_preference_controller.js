const { User_Preference } = require("../models");

// Get all users
exports.getAllUserPreferences = async (req, res, next) => {
  try {
    const user_preferenes = await User_Preference.findAll();

    res.json({
      status: "success",
      content: user_preferenes,
    });
  } catch (err) {
    console.error("Error fetching user_preferenes:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching user_preferenes",
    });
  }
};

// Get user by ID
exports.getUserPreferenceByID = async (req, res, next) => {
  try {
    const user_preferene = await User_Preference.findByPk(req.params.id);
    res.json({
      status: "success",
      content: user_preferene ? user_preferene : "user_preferene  not found",
    });
  } catch (err) {
    console.error("Error fetching user_preferenes:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching user_preferene",
    });
  }
};
