const { Result, Place } = require("../models");

// Get all users
exports.getAllResult = async (req, res, next) => {
  try {
    const result = await Result.findAll();

    res.json({
      status: "success",
      content: result,
    });
  } catch (err) {
    console.error("Error fetching result:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching results",
    });
  }
};

// Get user by ID
exports.getResultById = async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.json({
      status: "success",
      content: result ? result : "result  not found",
    });
  } catch (err) {
    console.error("Error fetching results:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching result",
    });
  }
};

exports.createNewResult = async (req, res) => {
  try {
    // const [budget_point, scenery_point, activity_point, weather_point] =
    //   await Promise.all([
    //     placeController.calculatedAllPlaceBudgetPoint(req, res),
    //     placeController.calculatedAllPlaceSceneryPoint(req, res),
    //     placeController.calculatedAllPlaceActivityPoint(req, res),
    //     placeController.calculatedAllPlaceWeatherPoint(req, res),
    //   ]);

    // const combinedResults = combine_all_score(
    //   budget_point,
    //   scenery_point,
    //   activity_point,
    //   weather_point
    // );

    let {
      userBudget,
      totalTravelDays,
      user_scenery_requirement,
      user_activity_preference,
      user_weather_preference,
      travel_month,
    } = req.body;

    userBudget = Number(userBudget) || 0;
    totalTravelDays = Number(totalTravelDays) || 0;

    if (
      user_scenery_requirement === undefined ||
      user_scenery_requirement === null
    ) {
      user_scenery_requirement = [];
    }

    if (
      user_activity_preference === undefined ||
      user_activity_preference === null
    ) {
      user_activity_preference = [];
    }

    if (
      user_weather_preference === undefined ||
      user_weather_preference === null
    ) {
      user_weather_preference = [];
    }

    if (
      (travel_month === undefined || travel_month === null) &&
      user_weather_preference
    ) {
      return res.status(400).json({
        status: "failed",
        content: "travel_month is required in body",
      });
    }

    const places = await Place.findAll();
    let scorings = await Promise.all(
      places.map(async (place) => {
        const { score: budget_score } = await place.calculatedBudgetPoint(
          userBudget,
          totalTravelDays
        );
        const scenery_score = await place.calculatedSceneryPoint(
          user_scenery_requirement
        );

        const { score: activity_score } = await place.calculatedActivityPoint(
          user_activity_preference
        );

        const { score: weather_score } = await place.calculatedWeatherPoint(
          user_weather_preference,
          travel_month
        );

        return {
          place_id: place.place_id,
          place_name: place.place_name,
          total_score:
            budget_score + scenery_score + activity_score + weather_score,
          detailed_scores: {
            budget_score,
            scenery_score,
            activity_score,
            weather_score,
          },
        };
      })
    );

    scorings.sort((a, b) => b.total_score - a.total_score);

    res.json({
      status: "success",
      user_preferences: {
        userBudget,
        totalTravelDays,
        user_scenery_requirement,
        user_activity_preference,
        user_weather_preference,
        travel_month,
      },
      content: scorings,
    });
  } catch (err) {
    console.error("Error creating result:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      error: {
        name: err.name || "ServerError",
        message: err.message || "Something went wrong while creating result",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // hide in prod
      },
    });
  }
};

//20 so dau, call lai ai de lay avg
