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
      content: place? place : "Place not found",
    });
  } catch (err) {
    console.error("Error fetching places:", err);

    res.status(500).json({
      status: "failed",
      content: err.message || "Something went wrong while fetching places",
    });
  }
};

// Create place
// exports.createPlace = async (req, res, next) => {
//   try {
//     const place = await Place.create(req.body);
//     res.status(201).json(place);
//   } catch (err) {
//     next(err);
//   }
// };

// // Update place
// exports.updatePlace = async (req, res, next) => {
//   try {
//     const [updated] = await Place.update(req.body, {
//       where: { place_id: req.params.id },
//     });
//     if (!updated) return res.status(404).json({ error: "Place not found" });

//     const updatedPlace = await Place.findByPk(req.params.id);
//     res.json(updatedPlace);
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete place
// exports.deletePlace = async (req, res, next) => {
//   try {
//     const deleted = await Place.destroy({
//       where: { place_id: req.params.id },
//     });
//     if (!deleted) return res.status(404).json({ error: "Place not found" });
//     res.json({ message: "Place deleted" });
//   } catch (err) {
//     next(err);
//   }
// };
