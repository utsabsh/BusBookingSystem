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

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getBusById = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findById(id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const updateBus = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedBus)
      return res.status(404).json({ message: "Bus not found", sucess: true });
    res.status(200).json({ message: "Bus Updated successfully", sucess: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findByIdAndDelete(id);
    if (!deletedBus) return res.status(404).json({ message: "Bus not found" });
    res
      .status(200)
      .json({ message: "Bus deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, sucess: false });
  }
};

module.exports = {
  Bus,
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
};
