const { User } = require("../models");

const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/;
  return passwordRegex.test(password);
};

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

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        error:
          "Username must be 3–20 characters and contain only letters, numbers, and underscores",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      hashed_password: password,
    });

    const { hashed_password, ...userSafe } = user.get({ plain: true });

    res.status(201).json({
      message: "User created successfully",
      user: userSafe,
    });
  } catch (err) {
    next(err);
  }
};

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
