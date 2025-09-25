import asyncHandler from "express-async-handler";
import Residency from "../models/Residency.js";
import User from "../models/User.js";

export const createResidency = asyncHandler(async (req, res) => {
  const { title, description, price, address, country, city, facilities, image, userEmail } =
    req.body.data || req.body;

  try {
    // const user = await User.findOne({ email: userEmail });
    // if (!user) {
    //   return res.status(404).json({ message: "Owner not found" });
    // }

    const residency = await Residency.create({
      title,
      description,
      price,
      address,
      country,
      city,
      facilities,
      image,
      userEmail,
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await Residency.find().sort({ createdAt: -1 });
  res.send(residencies);
});

export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const residency = await Residency.findById(id);
  if (!residency) return res.status(404).json({ message: "Not found" });
  res.send(residency);
});

export const deleteResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const residency = await Residency.findById(id);
  if (!residency) return res.status(404).json({ message: "Not found" });
  await residency.deleteOne();
  res.send({ message: "Residency deleted successfully" });
});


