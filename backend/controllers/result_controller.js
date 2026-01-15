const { Result, Place } = require("../models");
const { handleCalculateAHP } = require("../utils/handleCalculateAHP");
const { validate_number } = require("../utils/validate_number");
const { Op, fn, col, literal } = require("sequelize");
// const { insertNewPreferenceGroup } = require("./preference_group_controller");

const insertNewResult = async (
  user_id,
  userBudget,
  totalTravelDays,
  user_scenery_requirement,
  user_activity_preference,
  user_weather_preference,
  travel_month,
  weights,
  place_id
) => {
  try {
    await Result.create({
      user_id: user_id,
      place_id: place_id,
      preferences: {
        weights,
        budget: userBudget,
        weather: user_weather_preference,
        scenery_requirement: user_scenery_requirement,
        activity_requirement: user_activity_preference,
        total_travel_days: totalTravelDays,
        travel_month,
      },
    });
  } catch {}
};

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

exports.getResultByUser = async (req, res, next) => {
  try {
    const result = await Result.findAll({
      where: { user_id: req.params.user_id },
      order: [["createdAt", "DESC"]],
    });
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

exports.getAllResultToday = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const result = await Result.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfToday,
        },
      },
      order: [["createdAt", "DESC"]],
    });

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

exports.getPopularPlaces = async (req, res) => {
  try {
    const lists = await Place.findAll({
      attributes: [
        "place_id",
        "place_name",
        "country",
        "place_img",
        "avg_cost_per_day",
        [fn("COUNT", col("Results.result_id")), "appearance_count"],
      ],
      include: [
        {
          model: Result,
          attributes: [],
          required: false, 
        },
      ],
      group: ["Place.place_id"],
      order: [
        [literal("appearance_count"), "DESC"],
        ["place_name", "ASC"],
      ],
    });

    res.json({
      status: "success",
      content: lists,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      content: err.message,
    });
  }
};

exports.createNewResult = async (req, res) => {
  try {
    let {
      userBudget = 0,
      totalTravelDays = 0,
      user_scenery_requirement = [],
      user_activity_preference = [],
      user_weather_preference = {},
      travel_month,
      weights = {},
    } = req.body || {};

    let ahp_weights = {};

    const hasWeights =
      weights && typeof weights === "object" && Object.keys(weights).length > 0;

    if (hasWeights) {
      ahp_weights = handleCalculateAHP(weights);
    }

    userBudget = Number(userBudget) || 0;
    totalTravelDays = Number(totalTravelDays) || 0;

    if (
      (travel_month === undefined || travel_month === null) &&
      user_weather_preference &&
      Object.values(user_weather_preference).some((value) => value !== null)
    ) {
      return res.status(400).json({
        status: "failed",
        content: "travel_month is required in body",
      });
    }

    const places = await Place.findAll();
    let scorings = await Promise.all(
      places.map(async (place) => {
        const { score: raw_budget_score } = await place.calculatedBudgetPoint(
          userBudget,
          totalTravelDays
        );
        const budget_score = validate_number(raw_budget_score, "budget_score");

        const raw_scenery_score = await place.calculatedSceneryPoint(
          user_scenery_requirement
        );
        const scenery_score = validate_number(
          raw_scenery_score,
          "scenery_score"
        );

        const { score: raw_activity_score } =
          await place.calculatedActivityPoint(user_activity_preference);
        const activity_score = validate_number(
          raw_activity_score,
          "activity_score"
        );

        const { score: raw_weather_score } = await place.calculatedWeatherPoint(
          user_weather_preference,
          travel_month
        );
        const weather_score = validate_number(
          raw_weather_score,
          "weather_score"
        );
        const total_score =
          hasWeights && ahp_weights
            ? budget_score * ahp_weights.budget +
              scenery_score * ahp_weights.scenery +
              activity_score * ahp_weights.activity +
              weather_score * ahp_weights.weather
            : budget_score + scenery_score + activity_score + weather_score;

        return {
          place_id: place.place_id,
          place_name: place.place_name,
          total_score: total_score,
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

    await insertNewResult(
      2,
      userBudget,
      totalTravelDays,
      user_scenery_requirement,
      user_activity_preference,
      user_weather_preference,
      travel_month,
      weights,
      scorings[0].place_id
    );

    // await Result.create({
    //   user_id: 1,
    //   preference_group_id: preferenceGroup.group_id,
    //   top_place_name: scorings[0].place_name,
    // });

    res.json({
      status: "success",
      user_preferences: {
        userBudget,
        totalTravelDays,
        user_scenery_requirement,
        user_activity_preference,
        user_weather_preference,
        travel_month,
        weights,
        AHP_weights: hasWeights && ahp_weights ? ahp_weights : {},
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
