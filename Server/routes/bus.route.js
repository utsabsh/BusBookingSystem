const express = require("express");
const { Bus, createBus } = require("../controllers/bus.controller");

const router = express.Router();

router.route("/add").post(createBus);
module.exports = router;
