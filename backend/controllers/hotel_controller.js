const { Hotel } = require("../models");

exports.getHotelByPlaceId = async (placeId) => {
  try {
    const hotels = await Hotel.findAll({
      where: {
        place_id: placeId
      }
    })

    return hotels ? hotels : []
  } catch (err) {
    console.log("Error fetching hotels")
  }
}

exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.findAll();

    res.json({
      status: "success",
      content: hotels,
    });
  } catch (err) {
    console.error("Error fetching hotels:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching hotels",
    });
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    res.json({
      status: "success",
      content: hotel ? hotel : "Place not found",
    });
  } catch (err) {
    console.error("Error fetching hotels:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching hotels",
    });
  }
};

