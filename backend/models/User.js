import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  image: String,
  bookedVisits: [
    {
      id: String,
      date: String,
    },
  ],
  favResidenciesID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Residency" }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
