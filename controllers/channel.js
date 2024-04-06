import mongoose from "mongoose";
import User from "../models/auth.js";
import Channels from "../models/channel.js";

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

export const getallchannels = async (req, res) => {
  console.log("we got the erquest ot get all chanenels ");
  try {
    const channels = await Channels.find();
    res.status(200).send(channels);
  } catch (error) {
    res.status(404).send("errro getting alll watch laters", error.Message);
  }
};
