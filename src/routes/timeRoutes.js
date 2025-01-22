
const express = require("express");
const router = express.Router();

const timeController = require("../controller/timeController");

router.get("/", timeController.getTime);
router.post("/", timeController.executeNextDay);

module.exports = router;