import React, { useState } from 'react';
import emailjs from 'emailjs-com'; 
import QRCode from 'qrcode.react';
import { Button, Input, Alert, AlertIcon } from '@chakra-ui/react';
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg'
import { useNavigate } from 'react-router-dom';

const PaymentGateway = ({ ticketPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [email, setEmail] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(''); 
  const [emailSent, setEmailSent] = useState(false);
  const [OtpInput,setOtpInput] = useState('');
  const [showPaymentAlert, setShowPaymentAlert] = useState(false); // State to track payment alert
  const navigate = useNavigate();

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Format card number by adding '-' after every 4 numbers
    if (name === 'cardNumber') {
      updatedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();
    }

    // Limit CVV input to 3 numbers
    if (name === 'cvv') {
      updatedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    // Limit expiry date input to MM/YY format
    if (name === 'expiryDate') {
      updatedValue = value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/').trim();
    }

    setCardDetails({ ...cardDetails, [name]: updatedValue });
  };

  const sendOtp = () => {
    // Send OTP via email
    const otp = Math.floor(1000 + Math.random() * 9000);
    setOtpInput(otp);
    emailjs.send('service_v47dmee', 'template_q3ueofo', { otp, userEmail: email }, 'X5gZ8867dH8cjMFJW')
      .then(() => {
        setOtpSent(true); // Set state to indicate OTP has been sent
        setEmailSent(true); // Set state to indicate email has been sent
        // Show alert when OTP is sent
        alert('OTP sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });
  };

  const handlePayment = () => {
    if (paymentMethod === 'UPI') {
      sendOtp();
    } else if (paymentMethod === 'Card') {
      // Simulate payment success
      setPaymentSuccess(true);
      // Set state to show payment success alert
      setShowPaymentAlert(true);
      // Redirect to profile page after payment success
      navigate('/profile');
    }
  };

  const handleOtpVerification = () => {
    // Verify the entered OTP
    if (otp == OtpInput) { 
      // OTP verification successful
      setPaymentSuccess(true);
      // Set state to show payment success alert
      setShowPaymentAlert(true);
      // Redirect to profile page after payment success after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } else {
      // OTP verification failed
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div style={{ backgroundImage: `url("${trainBackGround}")`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>
      <div className='container' style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
        <div style={{ boxShadow: '0px 7px 29px rgba(100, 100, 111, 0.2)', borderRadius:'10px',padding:'20px', height:'auto', width:'500px', backgroundColor:'white', marginTop:'250px' }}>
          <h2 style={{textAlign:'center'}}>Payment Gateway</h2>
          <div style={{ display:'flex', gap:'50px', justifyContent:'center', margin:'10px' }}>
            <Button onClick={() => handlePaymentMethod('UPI')}>UPI</Button>
            <Button onClick={() => handlePaymentMethod('Card')}>Card</Button>
          </div>

          {paymentMethod === 'UPI' && (
            <div style={{ display:'flex',justifyContent:'center', margin:'20px 20px 20px 20px' }}>
              <QRCode value="random_placeholder_string" />
            </div>
          )}

          {paymentMethod === 'Card' && (
            <div>
              {otpSent ? (
                <div>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button onClick={handleOtpVerification}>Verify OTP</Button>
                  {paymentSuccess && (
                    <Alert status="success" position="fixed" top="20px" right="20px" width={"400px"}>
                      <AlertIcon />
                      Payment successful!
                    </Alert>
                  )}
                </div>
              ) : (
                <div>
                  <Input
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                  />
                  <div style={{display:'flex', gap:'20px', marginTop:'10px', marginBottom:'10px'}}>
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
                  {emailSent && !otpSent && ( 
                    <div>
                      <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <Button onClick={handleOtpVerification}>Verify OTP</Button>
                    </div>
                  )}
                  {!emailSent && ( 
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      style={{marginBottom:'10px'}}
                    />
                  )}
                  {!emailSent && ( // Display "Send OTP" button if email is not sent
                    <Button onClick={sendOtp}>Send OTP</Button>
                  )}
           
                 
                  {emailSent && ( // Show alert when email is sent
                    <Alert status="info" position="fixed" top="20px" right="20px" width={"400px"}>
                      <AlertIcon />
                      Email sent successfully!
                    </Alert>
                  )}

                  

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
