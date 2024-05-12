import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import the emailjs library
import QRCode from 'qrcode.react'; // Import the QRCode component

const PaymentGateway = ({ ticketPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const sendOTP = () => {
    const otpValue = Math.floor(Math.random() * 10000);
    setOtp(otpValue);

    const emailBody = `<h2>Your OTP is ${otpValue}</h2>`;

    // Sending email using emailjs
    emailjs.send('service_v47dmee', 'template_hh80hdg', {
      to_email: email,
      from_email: 'abc@gmail.com',
      subject: 'Email OTP using React',
      html: emailBody,
    }).then((response) => {
      if (response.status === 200) {
        alert('OTP sent to your email ' + email);
        setOtpSent(true);
      }
    }).catch((error) => {
      console.error('Error sending email:', error);
    });
  };

  const verifyOTP = () => {
    if (otp === parseInt(otp, 10)) { // Check if otp is a valid number
      if (otp.toString() === otpInput) {
        alert('Email address verified...');
        setVerificationSuccess(true);
      } else {
        alert('Invalid OTP');
      }
    } else {
      alert('Invalid OTP');
    }
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    if (paymentMethod === 'UPI') {
      // Generate a random string for the QR code content
      const randomString = Math.random().toString(36).substring(2, 15);
      // Display QR code with the random string
      return <QRCode value={randomString} />;
    } else if (paymentMethod === 'Card') {
      const otpValue = '123456'; 
      if (otp === otpValue) {
        setPaymentSuccess(true);
        alert('Payment successful!');
      } else {
        alert('Invalid OTP');
      }
    }
  };

  return (
    <div>
      <h2>Payment Gateway</h2>
      <div>
        <button onClick={() => handlePaymentMethod('UPI')}>UPI</button>
        <button onClick={() => handlePaymentMethod('Card')}>Card</button>
      </div>

      {paymentMethod === 'UPI' && (
        <div>
          {/* Display QR code for UPI payment */}
          <QRCode value="random_placeholder_string" /> {/* Placeholder QR code */}
          <p>Total Amount: {ticketPrice}</p>
        </div>
      )}

      {paymentMethod === 'Card' && (
        <div>
          <input
            type="text"
            placeholder="Card Number"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
          />
          <input
            type="text"
            placeholder="Expiry Date"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleCardDetailsChange}
          />
          <input
            type="text"
            placeholder="CVV"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardDetailsChange}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>

          {otpSent && (
            <div className="otpverify">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
              <button onClick={verifyOTP}>Verify OTP</button>
            </div>
          )}

          {verificationSuccess && <p>Email address verified successfully!</p>}
          
          <button onClick={handlePayment}>Make Payment</button>
          {paymentSuccess && <p>Payment successful!</p>}
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
