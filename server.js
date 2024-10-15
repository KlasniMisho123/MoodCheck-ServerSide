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


app.get("/", async (req, res) => {
    console.log("Connected to Server");
    res.send("Server is running");
    
});

app.get("/test", async (req, res) => { 
    try {
        const mailOptions = await transporter.sendMail({
            from: {
                name: "MoodCheck User",
                address: process.env.USER
            },
            to: ["kirisame404@gmail.com"],
            subject: "Sending MoodCheck Feedback ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        async function sendMail(transporter, mailOptions) {
            try {
                await transporter.sendMail(mailOptions)
                console.log("Email has been sent succesfully!")
            } catch(err) {
                console.error('sendMail Error: ',err)
            }
        }
        sendMail(transporter, mailOptions);
    } catch(err) {
        console.log("ERR: ",err)
    }
})


app.post("/sendemail", async (req, res) => {
        const { contactName, contactEmail, contactSubject, contactText } = req.body; 
    try {
        res.json({ message: "Email has been sent successfully!" });
    } catch(err) {
        console.log(err.message)
    } 
});



app.listen(port, () => {
    console.log(`App is Running on: http://localhost:${port}`);
});
