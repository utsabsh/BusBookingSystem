const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seat_number: { type: Number, required: true },
  booked: { type: Boolean, default: false },
  booking_reference: { type: String, default: null },
  passenger_name: { type: String, default: null },
  booking_time: { type: Date, default: null },
});

const busSchema = new mongoose.Schema(
  {
    bus_name: { type: String, required: true },
    bus_number: { type: String, required: true, unique: true },
    route: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    departure_time: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    total_seats: { type: Number, required: true },
    available_seats: { type: Number, required: true },
    price: { type: Number, required: true },
    bus_type: {
      type: String,
      enum: ["Seater", "Sleeper", "Semi-Sleeper", "Luxury", "Ultra-Luxury"],
      required: true,
    },
    amenities: [{ type: String }],
    seating_configuration: [seatSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
