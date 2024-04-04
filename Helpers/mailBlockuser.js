import nodemailer from "nodemailer";

export const mailBlockuser = async (email) => {
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
    subject: "Account Blocked on 5 login fails !!",
    text: "Dear user someone is trying to login to your account of Metube..... We have blocked it for 1 hours",
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Blocked mail send:", info.response);
  } catch (error) {
    console.error("Error sending Block mail :", error);
  }
};
