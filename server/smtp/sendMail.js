import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: {
    name: "Exim logic",
    address: process.env.USER,
  },
  to: ["muskansinghhh7562@gmail.com"],
  subject: "Hello ✔",
  text: "Hello world?",
  html: "<b>Hello world?</b>",
};

const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

sendMail(transporter, mailOptions);
