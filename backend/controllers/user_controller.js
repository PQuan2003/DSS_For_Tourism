const { User } = require("../models");

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.json({
      status: "success",
      content: users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching users",
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.create(username, hashed_password);
    // Strip hashed_password before sending response
    const { hashed_password, ...userSafe } = user.get({ plain: true });

    res
      .status(201)
      .json({ message: "User created successfully", user: userSafe });
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
