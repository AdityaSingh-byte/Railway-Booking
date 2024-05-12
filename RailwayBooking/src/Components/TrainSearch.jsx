import React, { useState } from 'react';
import axios from 'axios';
import'../Components/TrainDetails.css'
import { Input,Box,Flex,Button} from '@chakra-ui/react'
import ClassCard from './ClassCard';
import trainImage from '../assets/Circle-icons-train.png';
const TrainSearch = () => {
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
    <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/steam-train-chugs-through-mountain-forest-scene-generative-ai_188544-8072.jpg?w=1380&t=st=1715520575~exp=1715521175~hmac=29b88a9e14195d068e1afbe21ae272d3de61892a64a17ad3f79faac45e6b7e35")', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>

    <div>
      <div className='inputDiv'>
    <h1>Search Your Train</h1>
     
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
