// SignUp.js
import React, { useState } from 'react';

const SignUp = ({ setUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSignUp = async () => {
    try {
      if (username && password) {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error('Failed to create account');
        }
        const newUser = await response.json();
        setUsers(prevUsers => [...prevUsers, newUser]);
        setUsername('');
        setPassword('');
        setShowAlert(true);
      } else {
        setError('Username and password are required');
      }
    } catch (error) {
      console.log(error);
      setError('Error signing up');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <div>{error}</div>}
      {showAlert && (
        <div>
          <p>Account created successfully!</p>
          <button onClick={() => setShowAlert(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
