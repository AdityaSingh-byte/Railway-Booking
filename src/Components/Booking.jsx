import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { storeTicketInfo } from '../Redux/store/Booking-slice';
import { Input, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Assuming you have Chakra UI

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
  const [date, setDate] = useState(''); 
  const addPassenger = (name, age, address, date) => { // Step 3: Include date parameter
    setPassengers(prevPassengers => [...prevPassengers, { name, age, address, date }]); // Step 3: Add date to passenger object
  };

  const calculateTotalAmount = () => {
    if (selectedTrain && selectedTrain.Classes && selectedClass) {
      const selectedClassData = selectedTrain.Classes.find(cls => cls.Class === selectedClass);
      if (selectedClassData) {
        const price = selectedClassData.Price;
        const numberOfPassengers = passengers.length;
        if (numberOfPassengers > 0) {
          const total = price * (numberOfPassengers + 1);
          setTotalAmount(total);
        } else {
          setTotalAmount(price);
        }
      }
    }
  };
  
  const handlePassenger = () => {
    calculateTotalAmount();
    addPassenger(name, age, address,date);
    setName('');
    setAge('');
    setAddress('');
    setDate(''); 
    console.log(date);
  };

  const handleBooking = () => {
    const ticketInfo = {
      train: selectedTrain,
      class: selectedClass,
      passengers: passengers,
      totalAmount: totalAmount,
    };
    dispatch(storeTicketInfo({ user: currentUser, ticketInfo: ticketInfo }));
    navigate('/payment');
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
  }

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'center' }}>Booking Details</h2>
      <div style={{display:'flex' ,alignItems:'center' ,justifyContent:'space-around' , marginBottom:'20px'}}>
      <h3 style={{color:'grey'}}>{selectedTrain.TrainName}</h3>
      <h4 style={{color:'grey'}}> Class: {selectedClass}</h4>
      </div>
    
      <div>
        <h5>Passenger Details:-</h5>
        <Table variant="simple" marginBottom='20px'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Address</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {passengers.map((passenger, index) => (
              <Tr key={index}>
                <Td>{passenger.name}</Td>
                <Td>{passenger.age}</Td>
                <Td>{passenger.address}</Td>
                <Td>{passenger.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' ,gap:"20px" ,margin:'20px'}}>
        <Input type="text" placeholder="Passenger Name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <Input type="number" placeholder="Passenger Age" value={age} onChange={(e) => setAge(e.target.value)} required/>
      </div>
      <div style={{ display: 'flex' ,gap:"20px" ,margin:'20px'}}>
        <Input type="text" placeholder="Passenger Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
        <Input type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
       
      </div>
      <Button marginLeft="20px" colorScheme='blue' onClick={handlePassenger} type='submit'>Add Passenger</Button>
      </form>
      
      <div style={{display:'flex',gap:'30px' , justifyContent:'flex-end'}}>
        <h4 style={{ display: 'flex', alignItems: 'center' }}>Total Amount :-<MdOutlineCurrencyRupee />{totalAmount}</h4>
        <Button colorScheme='blue' onClick={handleBooking}>Confirm Booking</Button>
      </div>
      
    </div>
  );
};

export default Booking;
