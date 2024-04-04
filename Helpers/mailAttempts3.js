import nodemailer from "nodemailer";

export const mailAttempts3 = async (email) => {
  console.log(email);
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
    subject: "Login Attempts failed for 3 times !!",
    text: "Dear user someone is trying to login to your account of Metube.....",
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Attempts 3 fail mail send:", info.response);
  } catch (error) {
    console.error("Error sending 3 Attemtps mail :", error);
  }
};
