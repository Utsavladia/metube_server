import mongoose from "mongoose";

const loginAttempt = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Assuming email is unique for each user
  failed: { type: Number, default: 0 }, // Default value for failed attempts
  blocked: { type: Boolean, default: false }, // Default value for blocked status
  blockTime: { type: Date, default: null },
});
export default mongoose.model("loginAttempt", loginAttempt);
