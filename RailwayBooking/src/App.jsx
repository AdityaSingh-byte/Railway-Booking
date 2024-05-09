import React, { useState } from 'react';
import SignUp from './Components/SignUp';
import Login from './Components/Login'
import PNRcomponent from './Components/PNRcomponent';
import TrainSearch from './Components/TrainSearch';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const handleSetUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className="App">
      <h1>Train Search App</h1>
      <TrainSearch />
    </div>
  );
};

export default App;
