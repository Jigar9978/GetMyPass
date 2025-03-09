import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    profileDetails: {
      name: { type: String, required: true },
      dob: { type: String, required: true },
      gender: { type: String, required: true },
      avatar: { type: String, default: "" },
    },
    address: {
      house: { type: String, required: true },
      street: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
