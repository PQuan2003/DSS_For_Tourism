const express = require("express");
const router = express.Router();
const formController = require("../controllers/form_controller");

// CRUD endpoints
router.get("/", formController.getFormInitalData);

module.exports = router;
