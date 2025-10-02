const { Result } = require("../models");

// Get all users
exports.getAllResult = async (req, res, next) => {
  try {
    const result = await Result.findAll();

    res.json({
      status: "success",
      content: result,
    });
  } catch (err) {
    console.error("Error fetching result:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching results",
    });
  }
};

// Get user by ID
exports.getResultById = async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.json({
      status: "success",
      content: result ? result : "result  not found",
    });
  } catch (err) {
    console.error("Error fetching results:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching result",
    });
  }
};
