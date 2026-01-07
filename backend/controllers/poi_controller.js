const { where } = require("sequelize");
const { POI, POI_Activity, Activity } = require("../models");

// Get all users
exports.getAllPOI = async (req, res, next) => {
  try {
    const poi = await POI.findAll();

    res.json({
      status: "success",
      content: poi,
    });
  } catch (err) {
    console.error("Error fetching poi:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching pois",
    });
  }
};

// Get user by ID
exports.getPOIById = async (req, res, next) => {
  try {
    const poi = await POI.findByPk(req.params.id);
    res.json({
      status: "success",
      content: poi ? poi : "POI  not found",
    });
  } catch (err) {
    console.error("Error fetching pois:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching poi",
    });
  }
};

exports.getPOIByPlaceId = async (placeId) => {
  try {
    const poisWithActivities = await POI.findAll({
      where: {
        place_id: placeId,
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      include: [
        {
          model: POI_Activity,
          attributes: {
            exclude: ["created_at", "updated_at"],
          },
          include: [
            {
              model: Activity,
              attributes: {
                exclude: ["created_at", "updated_at"],
              },
            },
          ],
        },
      ],
    });
    // console.log(JSON.stringify(poisWithActivities, null, 2));

    if (poisWithActivities && poisWithActivities.length > 0) {
      return poisWithActivities.map((poi) => {
        const activities =
          poi.POI_Activities && poi.POI_Activities.length > 0
            ? poi.POI_Activities.map((pa) => {
                return pa.Activity
                  ? {
                      activity_id: pa.Activity.activity_id,
                      activity_name: pa.Activity.activity_name,
                      activity_description: pa.Activity.activity_description,
                    }
                  : null;
              }).filter((activity) => activity !== null)
            : [];

        return {
          place_id: poi.place_id,
          poi_name: poi.poi_name,
          poi_description: poi.poi_description,
          opening_hour: poi.opening_hour,
          additional_fee: poi.additional_fee,
          entry_fee: poi.entry_fee,
          rating: poi.rating,
          timezone: poi.timezone,
          tags: poi.tags,
          activities: activities,
        };
      });
    } else {
      return []; // Return empty array if no POIs found
    }
  } catch (err) {
    console.log("Error getting POIs: ", err);
  }
};
