import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String },
  name: { type: String },
  desc: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", usersSchema);
