const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity_controller");

// CRUD endpoints
router.get("/", activityController.getAllActivity);

module.exports = router;
