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

// Get bookings by user_id
router.get("/getbooking/user/:userId", async (req, res) => {
  console.log("booking route hit", req.params.userId);
  try {
    const bookings = await Booking.find({
      user_id: req.params.userId,
    }).populate("user_id bus_id");
    if (!bookings.length)
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookings by bus_id
router.get("/booking/getbooking/bus/:busId", async (req, res) => {
  try {
    const bookings = await Booking.find({ bus_id: req.params.busId }).populate(
      "user_id bus_id"
    );
    if (!bookings.length)
      return res
        .status(404)
        .json({ message: "No bookings found for this bus" });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
