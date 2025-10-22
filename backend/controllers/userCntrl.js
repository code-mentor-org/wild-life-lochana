import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Residency from "../models/Residency.js";

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create(req.body);
    return res.send({ message: "User registered successfully", user });
  }
  res.status(201).send({ message: "User already registered" });
});

// Book a visit
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.bookedVisits.some((visit) => visit.id === id)) {
    return res.status(400).json({ message: "Already booked" });
  }

  user.bookedVisits.push({ id, date });
  await user.save();

  res.send("Your visit is booked successfully");
});

// All bookings - FIXED: Handle user not found
export const allBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email }).select("bookedVisits");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.send(user.bookedVisits || []);
});

// Cancel booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.bookedVisits = user.bookedVisits.filter((visit) => visit.id !== id);
  await user.save();

  res.send("Booking cancelled successfully");
});

// Add/remove favorite
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.favResidenciesID.includes(rid)) {
    user.favResidenciesID = user.favResidenciesID.filter((id) => id.toString() !== rid);
    await user.save();
    return res.send({ message: "Removed from favorites", user });
  }

  user.favResidenciesID.push(rid);
  await user.save();
  res.send({ message: "Added to favorites", user });
});

// Get all favorites - FIXED: Handle user not found and empty favorites
export const getAllFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email }).populate("favResidenciesID");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.send(user.favResidenciesID || []);
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.send(users);
});