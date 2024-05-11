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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{train.TrainName}</h5>
        <p className="card-text">Train Number: {train.train_number}</p>
        <p className="card-text">Source: {train.source}</p>
        <p className="card-text">Destination: {train.destination}</p>
        <div>
          <p>Select Class:</p>
          {train.Classes.map((cls) => (
            <Button
              key={cls.Class}
              onClick={() => handleSelectClass(cls.Class)}
              variant='outline'
              _active={{ bg: '#dddfe2' }}
              isSelected={cls.Class === selectedClass} // Add this line
            >
              {cls.Class}
            </Button>
          ))}
        </div>
        <Button onClick={handleSubmitWithLogin} colorScheme='blue'>Book Ticket</Button>
      </div>
    </div>
  );
};

export default TrainDetailsCard;
