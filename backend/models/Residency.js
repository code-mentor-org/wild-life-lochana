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
  expiresAt: {
        type: Date,
        index: { expireAfterSeconds: 0 }
    }
}, { timestamps: true });

residencySchema.pre('save', function(next) {
    if (this.price && this.isNew) {
        this.expiresAt = new Date(Date.now() + (this.price * 60 * 1000));
    }
    next();
});

const Residency = mongoose.model("Residency", residencySchema);
export default Residency;
