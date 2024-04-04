import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import path from "path";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.send("hello bhai ");
});

app.use("/user", userRoutes);
app.use("/video", videoRoutes);

app.use("/uploads", express.static(path.join("uploads")));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app is listening ");
});

const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("database connected");
  }).catch = (error) => {
  console.log(error);
};
