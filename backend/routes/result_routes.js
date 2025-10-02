const express = require("express");
const router = express.Router();
const ResultLController = require("../controllers/result_controller");

// CRUD endpoints
router.get("/", ResultLController.getAllResult);
router.get("/:id", ResultLController.getResultById);

// router.post("/", ResultLController.createPlace);
// router.put("/:id", ResultLController.updatePlace);
// router.delete("/:id", ResultLController.deletePlace);

module.exports = router;
