const express = require("express");
const Booking = require("../models/Booking.model");

const router = express.Router();

// Create a new booking
router.post("/create", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
router.get("/getbooking", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user_id bus_id");
    res
      .status(200)
      .json({ bookings: bookings, message: "success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// Get a single booking by ID
router.get("/getbooking/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user_id bus_id"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
