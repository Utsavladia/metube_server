import { sendOtp } from "../Helpers/sendOtp.js";
import tempUser from "../models/tempUser.js";
import User from "../models/auth.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  try {
    const existing = await tempUser.findOne({ email: email });
    if (existing) {
      await tempUser.findOneAndUpdate(
        { email: email },
        { password: password, otp: otp }
      );
    } else {
      await tempUser.create({
        email: email,
        password: password,
        otp: otp,
      });
    }
    await sendOtp(email, otp);
    res.status(200).json({ message: "otp send successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const validateOtp = async (req, res) => {
  const { email, password, otp } = req.body;
  console.log(email, password, otp);
  const exist = await tempUser.findOne({
    email: email,
    password: password,
    otp: otp,
  });
  if (exist) {
    const user = await User.findOne({ email: email });
    if (user) {
      const newuser = await User.findOneAndUpdate(
        { email: email },
        { password: password }
      );
      console.log("updated the existing as", newuser);
    } else {
      const newuser = await User.create({ email: email, password: password });
      console.log("updated new user as ", newuser);
    }
    res.status(200).json({ message: "User created successfuly" });
  } else {
    res.status(400).json({ message: "Enter correct Otp" });
  }
};
