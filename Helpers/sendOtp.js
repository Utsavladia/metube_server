import nodemailer from "nodemailer";

export const sendOtp = async (email, otp) => {
  console.log(email, otp);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_MY,
      pass: process.env.PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_MY,
    to: email,
    subject: "meTube Email Verification OTP",
    text: `Your OTP for email verification is: ${otp}`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
