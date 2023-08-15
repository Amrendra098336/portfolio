// @Author: Amrendra
// Backend Server Setup for Handling Contact Form Submission

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware for serving static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "your-html-filename.html"));
});

// Endpoint to handle form submission
app.post("/contact", async (req, res) => {
  // Destructure form input data
  console.log(req.body);
  const { name, email, message } = req.body;

  // Set up email transporter
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email details
  const mailToUser = {
    from: "your-email@example.com",
    to: email,
    subject: `Thank You for Contacting Us, ${name}!`,
    html: `<h3>Hi ${name},</h3><p>Thanks for reaching out! We've received your message and will get back to you shortly.</p><br><p>Regards,<br>Your Team</p>`,
  };

  const mailToSelf = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Message from ${email}`,
    text: `Received message from ${name} (${email}): ${message}`,
  };

  try {
    // Send emails
    await Promise.all([
      transporter.sendMail(mailToUser),
      transporter.sendMail(mailToSelf),
    ]);
    res.json({ status: "success", message: "Thank you for your message!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to send your message. Please try again later.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
