const express = require("express");
const {
  Bus,
  createBus,
  getAllBuses,
} = require("../controllers/bus.controller");

const router = express.Router();

router.route("/add").post(createBus);
router.route("/get").get(getAllBuses);
module.exports = router;
