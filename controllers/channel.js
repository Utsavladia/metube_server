import mongoose from "mongoose";
import User from "../models/auth.js";

export const updateChannelData = async (req, res) => {
  const { id: _id } = req.params;
  const { name, desc } = req.body;
  console.log("update channel with the data:", req.params, req.body);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid Channel ID" });
  }
  try {
    const updatedChannel = await User.findByIdAndUpdate(
      _id,
      { name, desc },
      { new: true }
    );

    if (!updatedChannel) {
      return res.status(404).json({ message: "channel not found" });
    }

    res.status(200).json({ result: updatedChannel });
  } catch (error) {
    console.error("Erroe updating channel ", error);
    res.status(405).json({ message: error.message });
  }
};
