const express = require("express");
const {
  Bus,
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  searchBus,
  updateById,
} = require("../controllers/bus.controller");

const router = express.Router();

router.route("/add").post(createBus);
router.route("/get").get(getAllBuses);
router.route("/getbyid/:id").get(getBusById);
router.route("/update/:id").patch(updateBus);
router.route("/booking/:id").put(updateById);
router.route("/delete/:id").delete(deleteBus);
router.route("/search").get(searchBus);
module.exports = router;
