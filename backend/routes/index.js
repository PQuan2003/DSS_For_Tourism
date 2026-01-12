const express = require("express");
const router = express.Router();

//Default backend route response
router.get("/", (req, res) => {
  res.send("Welcome to the server");
});

/**
 * Authentication & Users
 */
router.use("/auth", require("./auth_route"));
router.use("/users", require("./user_routes"));
router.use("/user_preferences", require("./user_preference_routes"));

/**
 * Core Resources
 */
router.use("/places", require("./place_routes"));
router.use("/hotels", require("./hotel_routes"));
router.use("/activities", require("./activity_route"));
router.use("/pois", require("./poi_routes"));
router.use("/poi_activities", require("./poi_activity_routes"));

/**
 * Recommendation & Results
 */
// router.use("/preference_groups", require("./preference_group_routes"));
router.use("/results", require("./result_routes"));
router.use("/result_locations", require("./result_location_routes"));

/**
 * Supporting Resources
 */
router.use("/weathers", require("./weather_routes"));
router.use("/form", require("./form_route"));

module.exports = router;
