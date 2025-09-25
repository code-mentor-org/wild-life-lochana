import mongoose from "mongoose";

const residencySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  address: { type: String, required: true },
  city: String,
  country: String,
  image: String,
  facilities: Object,
  userEmail: { type: String, required: true, ref: "User" },
}, { timestamps: true });

const Residency = mongoose.model("Residency", residencySchema);
export default Residency;
