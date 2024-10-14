import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json()); 

app.get("/", async (req, res) => {
    console.log("Connected to Server");
    res.send("Server is running");
});

app.post("/sendemail", async (req, res) => {
    try {
        const { contactName, contactEmail, contactSubject, contactText } = req.body; 
        console.log("Received data:", { contactName, contactEmail, contactSubject, contactText });
        res.json({ message: "Email has been sent successfully!" });
    } catch(err) {
        console.log(err.message)
    }
});

app.listen(port, () => {
    console.log(`App is Running on: http://localhost:${port}`);
});
