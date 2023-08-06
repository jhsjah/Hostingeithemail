const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/send-email", async (req, res) => {
    const { recipient, message, name, senderEmail, location, pinCode } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: "Email from Node.js",
            text: `
                Name: ${name}
                Sender Email: ${senderEmail}
                Location: ${location}
                Pin Code: ${pinCode}
                Message: ${message}
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
