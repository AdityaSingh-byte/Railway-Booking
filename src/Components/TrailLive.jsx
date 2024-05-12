import React, { useEffect, useState } from 'react';
import { fetchLiveLocation } from '../Redux/Action/LiveLocationAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import './Live.css'; // Import CSS file for animation
import trainImage from '../assets/Circle-icons-train.png'; // Import your train image
import { Input,Box } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
const TrailLive = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleTrainSearch = () => {
    axios.get(`http://localhost:3000/TrainDetails?train_number=${trainNumber}`)
      .then(response => {
        setSearchResult(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
      });
  };

  return (
    <>
   
    <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/steam-train-chugs-through-mountain-forest-scene-generative-ai_188544-8072.jpg?w=1380&t=st=1715520575~exp=1715521175~hmac=29b88a9e14195d068e1afbe21ae272d3de61892a64a17ad3f79faac45e6b7e35")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>

  
    <div className="container">
      <h1>Live Train Location</h1>
      <div className='inputDiv'>

     
      <Flex minWidth='500px' alignItems='center' gap='2' alignContent='center'>
     
      <Input w="500px"
        type="text"
        placeholder="Enter Train Number"
        value={trainNumber}
        bg="white"
        onChange={(e) => setTrainNumber(e.target.value)}
      />
      <Button onClick={handleTrainSearch}  colorScheme='blue' >Search</Button>
    
      </Flex>
      </div>
    
     

      {searchResult && (
        <div className="train-journey">
          <img src={trainImage} alt="Train" className="train" />
          <div className="journey-line">
            <div className="source "></div>
            <p className="station-label start-label">{searchResult.source}</p>
            <div className="current"></div>
            <p className="station-label middle-label">{searchResult.current_location}</p>
            <div className="destination"></div>
            <p className="station-label end-label">{searchResult.destination}</p>
          </div>
          <div>
          
          </div>
        </div>
      )}
    </div>
    </div>
    </>
  );
}

export default TrailLive;
