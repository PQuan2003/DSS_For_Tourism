const { Place } = require("../models");

// Get all places
exports.getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.findAll();

    res.json({
      status: "success",
      content: places,
    });
  } catch (err) {
    console.error("Error fetching places:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching places",
    });
  }
};

// Get place by ID
exports.getPlaceById = async (req, res, next) => {
  try {
    const place = await Place.findByPk(req.params.id);
    res.json({
      status: "success",
      content: place ? place : "Place not found",
    });
  } catch (err) {
    console.error("Error fetching places:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching places",
    });
  }
};

exports.calculatedAllPlaceBudgetPoint = async (req, res, next) => {
  try {
    let { userBudget, totalTravelDays } = req.body;

    // Handle missing parameters
    userBudget = Number(userBudget) || 0;
    totalTravelDays = Number(totalTravelDays) || 0;

    const places = await Place.findAll();

    const scorings = places.map((place) => {
      const { score, totalBudgetNeeded } = place.calculatedBudgetPoint(
        userBudget,
        totalTravelDays
      );

      return {
        place_name: place.place_name,
        score: score || -1,
        totalBudgetNeeded: totalBudgetNeeded || -1,
        money_unit: place.money_unit,
      };
    });

    // Sort highest → lowest
    scorings.sort((a, b) => b.score - a.score);

    res.json({
      status: "success",
      content: scorings,
    });
  } catch (err) {
    console.error("Error calculating budget scores:", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.calculateIndividualPlaceBudgetScore = async (req, res, next) => {
  try {
    const { place_id } = req.params;

    if (!place_id) {
      return res.status(400).json({
        status: "failed",
        content: "place_id is required in params",
      });
    }

    let { userBudget, totalTravelDays } = req.body;

    // handle missing parameters
    userBudget = Number(userBudget) || 0;
    totalTravelDays = Number(totalTravelDays) || 0;

    // Find place by ID
    const place = await Place.findByPk(place_id);

    if (!place) {
      return res.status(404).json({
        status: "failed",
        content: `Place with id ${place_id} not found`,
      });
    }

    const { score, totalBudgetNeeded } = place.calculatedBudgetPoint(
      userBudget,
      totalTravelDays
    );

    console.log(score, totalBudgetNeeded);

    res.json({
      status: "success",
      content: {
        place_name: place.place_name,
        score: score || -1,
        totalBudgetNeeded: totalBudgetNeeded || -1,
        moeny_unit: place.money_unit,
      },
    });
  } catch (err) {
    console.error("Error calculating budget scores:", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.calculatedAllPlaceSceneryPoint = async (req, res) => {
  try {
    let user_preference = req.body;

    if (!user_preference) {
      user_preference = {};
    }

    const places = await Place.findAll();

    const scorings = places.map((place) => {
      const score = place.calculatedSceneryPoint(
        user_preference.user_scenery_requirement
      );

      return {
        place_id: place.place_id,
        place_name: place.place_name,
        tags: place.tags,
        score,
      };
    });

    scorings.sort((a, b) => b.score - a.score);

    res.json({
      status: "success",
      content: scorings,
    });
  } catch (err) {
    console.log("Error calculating scenery scores", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.calculateIndividualPlaceSceneryScore = async (req, res) => {
  try {
    let { place_id } = req.params;
    if (!place_id) {
      return res.status(400).json({
        status: "failed",
        content: "place_id is required in params",
      });
    }

    let user_preference = req.body;
    if (!user_preference) {
      console.log("Empty Scenery Req");
      user_preference = {};
    }
    console.log(
      "Requireeeeeeeeeeeeeeeeee",
      user_preference.user_scenery_requirement
    );
    const place = await Place.findByPk(place_id);

    if (!place) {
      return res.status(404).json({
        status: "failed",
        content: `Place with id ${place_id} not found`,
      });
    }

    const score = place.calculatedSceneryPoint(
      user_preference.user_scenery_requirement
    );

    res.json({
      status: "success",
      place_id: place.place_id,
      place_name: place.place_name,
      tags: place.tags,
      score,
    });
  } catch (err) {
    console.log("Error calculating scenery scores", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};
