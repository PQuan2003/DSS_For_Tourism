const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({
        error: "Username doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};
