import React, { useState } from 'react';
import emailjs from 'emailjs-com'; 
import QRCode from 'qrcode.react';
import { Button,Input } from '@chakra-ui/react';
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg'
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
    <div style={{ backgroundImage: `url("${trainBackGround}")`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>


    <div className='container' style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
     <div style={{ boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)' ,borderRadius:'10px',padding:'20px' ,height:'auto',width:'500px', backgroundColor:'white' ,marginTop:'250px'}}>


     
      <h2 style={{textAlign:'center'}}>Payment Gateway</h2>
      <div style={{ display:'flex' ,gap:'50px', justifyContent:'center', margin:'10px'}}>
        <Button onClick={() => handlePaymentMethod('UPI')}>UPI</Button>
        <Button onClick={() => handlePaymentMethod('Card')}>Card</Button>
      </div>

      {paymentMethod === 'UPI' && (
        <div style={{ display:'flex',justifyContent:'center' ,margin:'20px 20px 20px 20px'}}>
          {/* Display QR code for UPI payment */}
          <QRCode value="random_placeholder_string" /> {/* Placeholder QR code */}
          
        </div>
      )}

      {paymentMethod === 'Card' && (
        <div >
          <Input
            type="text"
            placeholder="Card Number"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
          />
          <div style={{display:'flex' ,gap:'20px',marginTop:'10px',marginBottom:'10px'}}>
          <Input
            type="text"
            placeholder="Expiry Date"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleCardDetailsChange}
          />
          <Input
            type="text"
            placeholder="CVV"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardDetailsChange}
          />
          </div>
         
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{marginBottom:'10px'}}
          />
          <Button onClick={sendOTP}>Send OTP</Button>

          {otpSent && (
            <div className="otpverify">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
              <Button colorScheme='blue' onClick={verifyOTP}>Verify OTP</Button>
            </div>
          )}

          {verificationSuccess && <p>Email address verified successfully!</p>}
          
          <Button margin='10px'colorScheme='blue' onClick={handlePayment}>Make Payment</Button>
          {paymentSuccess && <p>Payment successful!</p>}
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default PaymentGateway;
