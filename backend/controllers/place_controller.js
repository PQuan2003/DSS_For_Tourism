const { Place } = require("../models");
const { Op, Sequelize } = require("sequelize");
const { getHotelByPlaceId } = require("./hotel_controller");
const { getWeatherByPlaceId } = require("./weather_controller");
const { getPOIByPlaceId } = require("./poi_controller");

const getDistinctCountry = async () => {
  try {
    const raw_data = await Place.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("country")), "country"],
      ],
    });

    const countries = raw_data ? raw_data.map((place) => place.country) : [];
    return countries;
  } catch (err) {
    console.error("Error fetching distinct countries:", err);
  }
};

const getDistictPlaceTags = async () => {
  try {
    const places = await Place.findAll({
      attributes: ["tags"],
    });
    let allTags = [];

    places.forEach((place) => {
      if (Array.isArray(place.tags)) {
        allTags = allTags.concat(place.tags);
      }
    });

    const distinctTags = [...new Set(allTags.map((tag) => tag))];

    return distinctTags ? distinctTags : [];
  } catch (err) {
    console.error("Error fetching distinct tags:", err);
  }
};

const getDistinctDensity = async () => {
  try {
    const raw_data = await Place.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("tourist_density")),
          "tourist_density",
        ],
      ],
    });

    const density = raw_data
      ? raw_data.map((place) => place.tourist_density)
      : [];
    console.log(density);
    return density;
  } catch (err) {
    console.error("Error fetching distinct countries:", err);
  }
};

// Get all places
exports.getAllPlaces = async (req, res, next) => {
  try {
    const { country, tags, density } = req.query;
    console.log("DENSITYYYYYYY", density);

    const where = {
      [Op.and]: [], // this will collect all groups
    };

    // if (country) {
    //   const countryList = country.split(",").map((t) => t.trim().toLowerCase());

    //   where[Op.and].push({
    //     [Op.or]: countryList.map((c) =>
    //       Sequelize.literal(`LOWER(country) = '${c}'`)
    //     ),
    //   });
    // }
    // if (tags) {
    //   const tagList = tags.split(",").map((t) => t.trim().toLowerCase());

    //   where[Op.or].push({
    //     [Op.or]: tagList.map((tag) =>
    //       Sequelize.literal(`JSON_CONTAINS(LOWER(tags), '["${tag}"]')`)
    //     ),
    //   });
    // }

    // if (density) {
    //   const densityList = density.split(",").map((t) => t.trim().toLowerCase());

    //   where[Op.and].push({
    //     [Op.or]: densityList.map((d) =>
    //       Sequelize.literal(`LOWER(tourist_density) = '${d}'`)
    //     ),
    //   });
    // }
    if (country) {
      const countryList = country.split(",").map((c) => c.trim().toLowerCase());

      where[Op.and].push({
        [Op.or]: countryList.map((c) =>
          Sequelize.literal(`LOWER(country) = '${c}'`)
        ),
      });
    }

    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim().toLowerCase());

      where[Op.and].push({
        [Op.or]: tagList.map((tag) =>
          Sequelize.literal(`JSON_CONTAINS(LOWER(tags), '["${tag}"]')`)
        ),
      });
    }

    if (density) {
      const densityList = density.split(",").map((d) => d.trim().toLowerCase());

      where[Op.and].push({
        [Op.or]: densityList.map((d) =>
          Sequelize.literal(`LOWER(tourist_density) = '${d}'`)
        ),
      });
    }

    const places = await Place.findAll({ where });

    res.json({
      status: "success",
      content: places,
    });
  } catch (err) {
    console.error("Error fetching places:", err);
  }
};

exports.getPlaceByName = async (req, res) => {
  try {
    const { place } = req.params;
    if (!place) {
      return res
        .status(400)
        .json({ error: "place_name parameter is required" });
    }

    const result = await Place.findOne({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("place_name")),
        "=",
        place.toLowerCase()
      ),
    });

    if (!result) {
      return res.status(404).json({ message: "Place not found" });
    }

    //TODO: get hotel list
    const hotels = await getHotelByPlaceId(result.place_id);

    //TODO: get Weather Data
    const weather_data = await getWeatherByPlaceId(result.place_id);

    //TODO: get POI + activities list
    const poi_data = await getPOIByPlaceId(result.place_id);

    //TODO chỉnh lại cái này
    return res.status(200).json({
      // status: "success",
      place: result,
      availableHotel: hotels,
      weather_data: weather_data,
      pois: poi_data,
    });
  } catch (err) {
    console.error("Error fetching place:", err);
    res.status(500).json({ error: "Internal server error" });
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

    // console.log(score, totalBudgetNeeded);

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

exports.calculatedAllPlaceActivityPoint = async (req, res) => {
  try {
    let user_preference = req.body;

    if (!user_preference) {
      user_preference = {};
    }

    const places = await Place.findAll();

    const scorings = await Promise.all(
      places.map(async (place) => {
        const { score, place_activity_tags } =
          await place.calculatedActivityPoint(
            user_preference.user_activity_requirement
          );

        return {
          place_id: place.place_id,
          place_name: place.place_name,
          score,
          place_activity_tags,
        };
      })
    );

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

exports.calculateIndividualPlaceActivityScore = async (req, res) => {
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
    const place = await Place.findByPk(place_id);

    if (!place) {
      return res.status(404).json({
        status: "failed",
        content: `Place with id ${place_id} not found`,
      });
    }

    const { score, place_activity_tags } = await place.calculatedActivityPoint(
      user_preference.user_activity_requirement
    );

    res.json({
      status: "success",
      place_id: place.place_id,
      place_name: place.place_name,
      score,
      place_activity_tags,
    });
  } catch (err) {
    console.log("Error calculating scenery scores", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.calculatedAllPlaceWeatherPoint = async (req, res) => {
  try {
    let user_preference = req.body;
    if (!user_preference) {
      console.log("Empty User Req");
      user_preference = {};
    }

    if (
      user_preference.travel_month === undefined ||
      user_preference.travel_month === null
    ) {
      return res.status(400).json({
        status: "failed",
        content: "travel_month is required in body",
      });
    }

    const places = await Place.findAll();

    const scorings = await Promise.all(
      places.map(async (place) => {
        const { score, weather_data } = await place.calculatedWeatherPoint(
          user_preference.user_weather_preference,
          user_preference.travel_month
        );

        return {
          place_id: place.place_id,
          place_name: place.place_name,
          score,
          weather_data,
        };
      })
    );

    scorings.sort((a, b) => b.score - a.score);

    res.json({
      status: "success",
      content: scorings,
    });
    console.log("finished calculating all weather point");
  } catch (err) {
    console.log("Error calculating weather scores", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.calculateIndividualPlaceWeatherScore = async (req, res) => {
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
      console.log("Empty User Req");
      user_preference = {};
    }

    if (
      user_preference.travel_month === undefined ||
      user_preference.travel_month === null
    ) {
      return res.status(400).json({
        status: "failed",
        content: "travel_month is required in body",
      });
    }

    const place = await Place.findByPk(place_id);

    if (!place) {
      return res.status(404).json({
        status: "failed",
        content: `Place with id ${place_id} not found`,
      });
    }

    const { score, weather_data } = await place.calculatedWeatherPoint(
      user_preference.user_weather_preference,
      user_preference.travel_month
    );

    res.json({
      status: "success",
      place_name: place.place_name,
      score,
      weather_data,
    });
  } catch (err) {
    console.log("Error calculating weather scores", err);
    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong",
    });
  }
};

exports.getPlaceFilters = async (req, res) => {
  const countries = await getDistinctCountry();
  const tags = await getDistictPlaceTags();
  const density = await getDistinctDensity();

  res.json({
    status: "success",
    country: countries,
    tags: tags,
    tourist_density: density,
  });
};
