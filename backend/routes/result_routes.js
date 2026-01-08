const express = require("express");
const router = express.Router();
const ResultLController = require("../controllers/result_controller");

// CRUD endpoints
router.get("/", ResultLController.getAllResult);
router.get("/user/:user_id", ResultLController.getResultByUser);
router.get("/id/:id", ResultLController.getResultById);

router.post("/new", ResultLController.createNewResult);


module.exports = router;

