const express = require("express");
const router = express.Router();
const Preference_Group = require("../controllers/preference_group_controller");

// CRUD endpoints
router.get("/", Preference_Group.getAllPreferenceGroup);
router.get("/:id", Preference_Group.getPreferenceGroupByID);

// router.post("/", Preference_Group.createPlace);
// router.put("/:id", Preference_Group.updatePlace);
// router.delete("/:id", Preference_Group.deletePlace);

module.exports = router;
