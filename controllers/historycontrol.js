import mongoose from "mongoose";
import History from "../models/History.js";

export const historyController = async (req, res) => {
  const { userId, history } = req.body;
  try {
    console.log(userId, history);
    let user = await History.findOne({ userId });
    if (user) {
      const historylist = user.history || [];

      historylist.push(history);
      user = await History.findOneAndUpdate(
        { userId },
        { history: historylist },
        { new: true }
      );
      res.status(200).json({ message: "history updated" });
    } else {
      const newHistory = new History({
        userId,
        history: [history],
      });
      await newHistory.save();
      res.status(200).json({ message: "new history created" });
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getHistoryController = async (req, res) => {
  const { userId } = req.query;
  try {
    const userHistory = await History.findOne({ userId });
    res.status(200).send(userHistory);
  } catch (error) {
    res.status(404).send("error finding history");
  }
};
