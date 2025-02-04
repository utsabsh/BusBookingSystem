const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    bus_name: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    departure_time: {
      type: Date,
      required: true,
    },

    total_seats: {
      type: Number,
      required: true,
    },
    available_seats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
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
