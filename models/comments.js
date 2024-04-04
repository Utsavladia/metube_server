import mongoose from "mongoose";
const comments = mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String },
  comment: { type: String },
  time: { type: Date, default: Date.now },
  name: { type: String },
});

export default mongoose.model("Comments", comments);
