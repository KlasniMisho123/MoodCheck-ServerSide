import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
//
// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json()); 
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

async function sendMail(transporter, mailOptions) {
    try {
        await transporter.sendMail(mailOptions)
        console.log("Email has been sent succesfully!")
    } catch(err) {
        console.error('sendMail Error: ',err)
    }
}

app.get("/", async (req, res) => {
    console.log("Connected to Server");
    res.send("Server is running");
    
});

app.post("/sendemail", async (req, res) => {
    const { contactName, contactEmail, contactSubject, contactText } = req.body; 
    console.log("RETRIEVED DATA: ", contactName, contactEmail, contactSubject, contactText);

    try {
        // Prepare the email options
        const mailOptions = {
            from: {
                name: contactName ? `${contactName} - MoodCheck User` : `MoodCheck User`,
                address: process.env.USER
            },
            to: ["moodcheck12@gmail.com"],
            subject: contactSubject,
            text: `${contactText}\n\nFrom: ${contactEmail}`,
        };

        // sendMail(transporter, mailOptions)
        await transporter.sendMail(mailOptions); // Send email directly without the need for sendMail function
        console.log("Email has been sent successfully!");
        res.json({ message: "Email has been sent successfully!" });
    } catch (err) {
        console.log("ERR: ", err);
        res.status(500).json({ error: "Failed to send email." }); // Send a response with error status
    } 
});



app.listen(port, () => {
    console.log(`App is Running on: http://localhost:${port}`);
});
