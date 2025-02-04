const Bus = require("../models/Bus.model");

// CRUD Operations
const createBus = async (req, res) => {
  console.log("body", req.body);
  try {
    const busData = req.body;
    const newBus = await Bus.create(busData);
    res.status(201).json({
      message: "Bus created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  Bus,
  createBus,
};
