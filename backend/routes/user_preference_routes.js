const express = require("express");
const router = express.Router();
const UserPreferenceController = require("../controllers/user_preference_controller");

// CRUD endpoints
router.get("/", UserPreferenceController.getAllUserPreferences);
router.get("/:id", UserPreferenceController.getUserPreferenceByID);

// router.post("/", UserPreferenceController.createPlace);
// router.put("/:id", UserPreferenceController.updatePlace);
// router.delete("/:id", UserPreferenceController.deletePlace);

module.exports = router;
