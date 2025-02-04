const express = require("express");
const {
  Bus,
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
} = require("../controllers/bus.controller");

const router = express.Router();

router.route("/add").post(createBus);
router.route("/get").get(getAllBuses);
router.route("/getbyid/:id").get(getBusById);
router.route("/update/:id").patch(updateBus);
module.exports = router;
