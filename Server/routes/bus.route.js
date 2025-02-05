const express = require("express");
const {
  Bus,
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
} = require("../controllers/bus.controller");

const router = express.Router();

router.route("/add").post(createBus);
router.route("/get").get(getAllBuses);
router.route("/getbyid/:id").get(getBusById);
router.route("/update/:id").patch(updateBus);
router.route("/delete/:id").delete(deleteBus);
module.exports = router;
