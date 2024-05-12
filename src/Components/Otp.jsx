import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

export const OTPGenerator = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [otp, setOtp] = useState('');

  const form = useRef();

  const sendOTP = (e) => {
    e.preventDefault();

    const otpValue = Math.floor(Math.random() * 10000);
    setOtp(otpValue);

    const emailBody = `<h2>Your OTP is ${otpValue}</h2>`;

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        user_email: email,
        message: emailBody,
      })
      .then(
        () => {
          console.log('OTP sent successfully!');
          setOtpSent(true);
        },
        (error) => {
          console.log('Failed to send OTP...', error.text);
        },
      );
  };

  const verifyOTP = () => {
    // Your OTP verification logic here
    // Compare the entered OTP with the generated OTP
    // If it matches, setVerificationSuccess(true)
    // Otherwise, display an error message
  };

  return (
    <form ref={form} onSubmit={sendOTP}>
      <label>Email</label>
      <input
        type="email"
        name="user_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="submit" value="Send OTP" />

      {otpSent && (
        <div>
          <label>Enter OTP</label>
          <input type="text" name="otp_input" />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}

      {verificationSuccess && <p>Email address verified successfully!</p>}
    </form>
  );
};
