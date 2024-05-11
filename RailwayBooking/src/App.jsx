import React, { useState } from 'react';
import SignUp from './Components/SignUp';
import Login from './Components/Login'
import './App.css'
import TrainSearch from './Components/TrainSearch';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Components/Navbar';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import TrainTicket from './Components/TrainTicket';
import TrailLive from './Components/TrailLive';
import Booking from './Components/Booking';
import Profile from './Components/Profile';
import PaymentGateway from './Components/PaymentGateway';

const App = () => {

  
  return (
    <div >
     
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/trainTicket" element={<TrainTicket/>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/signup" element={<SignUp/>} ></Route>
        <Route path="/live" element={<TrailLive/>} ></Route>
        <Route path="/booking" element={<Booking/>} ></Route>
        <Route path="/profile" element={<Profile/>} ></Route>
        <Route path="/payment" element={<PaymentGateway/>} ></Route>
      </Routes>
    
    </div>
  );
};

export default App;
