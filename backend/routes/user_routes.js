const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

// Example CRUD endpoints
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

module.exports = router;
