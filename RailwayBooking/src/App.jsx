import React, { useState } from 'react';
import SignUp from './Components/SignUp';
import Login from './Components/Login'

import TrainSearch from './Components/TrainSearch';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Components/Navbar';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import TrainTicket from './Components/TrainTicket';
import TrailLive from './Components/TrailLive';

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
      </Routes>
    
    </div>
  );
};

export default App;
