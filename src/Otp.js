const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jacques.graham51@ethereal.email',
        pass: 'JQmbTGu1q5au64rvXs'
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { toEmail, subject, html } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: toEmail, // Recipient address
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});