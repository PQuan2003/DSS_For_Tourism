const { Hotel } = require("../models");

// Get all users
exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.findAll();

    res.json({
      status: "success",
      content: hotels,
    });
  } catch (err) {
    console.error("Error fetching hotels:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching hotels",
    });
  }
};

// Get user by ID
exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    res.json({
      status: "success",
      content: hotel ? hotel : "Place not found",
    });
  } catch (err) {
    console.error("Error fetching hotels:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching hotels",
    });
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "User not found" });

    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};
