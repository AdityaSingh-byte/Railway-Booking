import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storeTicketInfo } from '../Redux/store/Booking-slice';
const Booking = () => {
  const selectedTrain = useSelector(state => state.trainBooking.selectedTrain);
  const selectedClass = useSelector(state => state.trainBooking.selectedClass);
  const currentUser = useSelector(state => state.user.user);
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const addPassenger = (name, age, address) => {
    setPassengers(prevPassengers => [...prevPassengers, { name, age, address }]);
  };

  // Calculate total amount based on selected class and number of passengers
  const calculateTotalAmount = () => {
    if (selectedTrain && selectedTrain.Classes && selectedClass) {
      const selectedClassData = selectedTrain.Classes.find(cls => cls.Class === selectedClass);
      if (selectedClassData) {
        const price = selectedClassData.Price;
        const numberOfPassengers = passengers.length;
        if(numberOfPassengers>0){
          
           
                const total = price * (numberOfPassengers+1);
            setTotalAmount(total); 
            console.log(total);
            }
            
        else {
            setTotalAmount(price);
        }
       
      }
    }
  };
  
  
  const handlePassenger=()=>{
    calculateTotalAmount();
    addPassenger(name, age, address);
   
    setName('');
    setAge('');
    setAddress('');
   
    
  }
  const handleBooking = () => {
    const ticketInfo = {
        train: selectedTrain,
        class: selectedClass,
        passengers: passengers,
        totalAmount: totalAmount,
      };
      dispatch(storeTicketInfo({ user: currentUser, ticketInfo: ticketInfo }));
    navigate('/profile');
  };

  return (
    <div>
      <h2>Booking Details</h2>
      <h3>Train: {selectedTrain.TrainName}</h3>
      <h3>Class: {selectedClass}</h3>
      <div>
        <h4>Passenger Details</h4>
        {passengers.map((passenger, index) => (
          <div key={index}>
            <p>Name: {passenger.name}</p>
            <p>Age: {passenger.age}</p>
            <p>Address: {passenger.address}</p>
          </div>
        ))}
      </div>
      <div>
        <input type="text" placeholder="Passenger Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Passenger Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="text" placeholder="Passenger Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handlePassenger}>Add Passenger</button>
      </div>
      <div>
        <p>Total Amount: {totalAmount}INR</p>
      </div>
      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
};

export default Booking;
