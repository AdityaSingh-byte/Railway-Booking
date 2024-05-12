import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectTrain, selectClass } from '../Redux/store/Booking-slice';
import { Button, ButtonGroup } from '@chakra-ui/react';

const TrainDetailsCard = ({ train }) => {
  const dispatch = useDispatch();
  const [redirectToBooking, setRedirectToBooking] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  
  const handleSelectTrain = (train) => {
    dispatch(selectTrain(train));
  };

  const handleSubmitWithLogin = () => {
    if (isAuthenticated) {
        dispatch(selectTrain(train));
      setRedirectToBooking(true);
      navigate('/booking');
    } else {
      alert('Please Login to continue');
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    dispatch(selectClass(cls));
  };

  

  return (
    <div style={{backgroundColor:'white' , boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px', borderRadius:"10px"}} >
       <div className='container main ' style={{backgroundColor:'white'}}>
        <div className='Name' style={{display:'flex' , justifyContent:'center'}}>
          <p>{train.TrainId}</p>
          <p>{train.TrainName}</p>
        </div>
        <div className='place'>
          <div className='Departure'>
            <p>{train.source}</p>
            <p>{train.departure_time}</p>
          </div>
          <div className="journey-line1">
         
            
          </div>
          <div className='arrival'>
            <p>{train.destination}</p>
            <p>{train.arrival_time}</p>
          </div>
        </div>
        <div style={{display:'flex' , justifyContent:'center'}}>
        {train.Classes.map((cls) => (
          <>
         
            <Button margin="10px"
              key={cls.Class}
              onClick={() => handleSelectClass(cls.Class)}
              variant='outline'
              _active={{ bg: '#dddfe2' }}
              isSelected={cls.Class === selectedClass} 
            >
              {cls.Class} 
              
            </Button>
          
            </>
          ))}
        </div>
          
          <div style={{display:'flex' , justifyContent:'center'}}>
          <Button onClick={handleSubmitWithLogin} colorScheme='blue'>Book Ticket</Button>
          </div>
             
        </div>  
       
      </div>
   
  );
};

export default TrainDetailsCard;
