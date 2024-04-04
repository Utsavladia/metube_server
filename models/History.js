import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  history: [{ type: String }],
});

export default mongoose.model("History", historySchema);
