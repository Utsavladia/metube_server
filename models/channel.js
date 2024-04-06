import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelId: { type: String, required: true, unique: true },
  subscribers: [{ type: String }],
});

export default mongoose.model("Channels", channelSchema);
