import mongoose from "mongoose";

const tempUser = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String },
});

export default mongoose.model("tempUser", tempUser);
