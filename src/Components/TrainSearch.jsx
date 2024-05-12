import React, { useState } from 'react';
import axios from 'axios';
import'../Components/TrainDetails.css'
import { Input,Box,Flex,Button} from '@chakra-ui/react'
import ClassCard from './ClassCard';
import trainImage from '../assets/Circle-icons-train.png';
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg'
const TrainSearch = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleTrainSearch = () => {
    axios.get(`https://railway-booking-3z2u.onrender.com/TrainDetails?train_number=${trainNumber}`)
      .then(response => {
        setSearchResult(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
      });
  };

  return (
    <div style={{ backgroundImage: `url("${trainBackGround}")`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>

    <div>
      <div className='inputDiv' style={{margin:'0px'}}>
    <h1>Search Your Train</h1>
     
<Flex minWidth='500px' alignItems='center' gap='2' alignContent='center'>

<Input w="500px"
  type="text"
  placeholder="Enter Train Number"
  value={trainNumber}
  bg="white"
  margin={"20px 0px"}
  onChange={(e) => setTrainNumber(e.target.value)}
/>
<Button  margin={"20px 0px"} onClick={handleTrainSearch}  colorScheme='blue' >Search</Button>

</Flex>
</div>
      {searchResult && (
        <div className='container main' style={{backgroundColor:'white'}}>
         <div className='Name'>
          <p>{searchResult.TrainId}</p>
          <p>{searchResult.TrainName}</p>
         </div>
         <div className='place'>
         <div className='Departure'>
            <p>{searchResult.source}</p>
            <p>{searchResult.departure_time}</p>
          </div>
          <div className="journey-line1">
            <div className="source1 "></div> 
          <div className="destination1"></div>
           
          </div>
          <div className='arrival'>
            <p>{searchResult.destination}</p>
            <p>{searchResult.arrival_time}</p>
          </div>
         </div>
          
          <div className='cards'>
            {searchResult.Classes.map((classInfo,index)=>(
              <ClassCard key={index} classInfo={classInfo} />
            ))}
          </div>
       
         
         
        </div>
      )}
    </div>
    </div>
  );
};

export default TrainSearch;
