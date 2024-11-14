import Travel from "../models/travel.model.js";
import mongoose from "mongoose";

export const getTravel = async (req, res) => {
  try {
    const travel = await Travel.find({});
    res.status(200).json({ success: true, data: travel });
  } catch (error) {
    console.log("error in fetching travel data", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching travel data" });
  }
};

export const createTravel = async (req, res) => {
  const travel = req.body;

  if (
    !travel.image ||
    !travel.name ||
    !travel.location ||
    !travel.price ||
    !travel.description
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  const newTravel = new Travel(travel);

  try {
    await newTravel.save();
    return res
      .status(201)
      .json({ success: true, message: "Travel log created successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating travel log",
      error: error.message,
    });
  }
};

export const deleteTravel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid id" });
  }

  try {
    await Travel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Travel log deleted successfully" });
  } catch (error) {
    console.log("Error in deleting travel log:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error deleting travel log" });
  }
};

export const upDateTravel = async (req, res) => {
  const { id } = req.params;
  const travel = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid id" });
  }
  try {
    const updatedTravel = await Travel.findByIdAndUpdate(id, travel, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedTravel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
