import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTrains } from '../Redux/Action/TrainTicket';
import TrainDetailsCard from './TrainDetailsCard';
import { Input ,Flex ,Button } from '@chakra-ui/react';
import trainBackGround from '../assets/steam-train-chugs-through-mountain-forest-scene-generative-ai.jpg'
const TrainSearch = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
  
    const dispatch = useDispatch();
    const trainData = useSelector((state) => state.train.trainData);
    const handleSearch = () => {
      dispatch(searchTrains(source, destination));
    };
  
    useEffect(() => {
        setSource('');
        setDestination('');
        dispatch(searchTrains(null, null)); 
    }, [location, dispatch]);
   
    return (
        <>
        <div style={{ backgroundImage: `url("${trainBackGround}")`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '90vh' }}>
      <div className='container'  >
        
        <div style={{display:'flex' , justifyContent:'center'}}>
        <Flex minWidth='500px' alignItems='center' gap='2' alignContent='center' margin='50px'>
     
     <Input w="250px" bg='white'
       type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)}
     />
      <Input w="250px"  bg='white'
      type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)}
     />
     <Button onClick={handleSearch}  colorScheme='blue' >Search Trains</Button>
   
     </Flex>
        </div> 
        <div >
        {trainData && trainData.length>0 && trainData.map((train) => (
          <div key={train.TrainId} >
            <TrainDetailsCard train={train} />
          
          </div>
        ))}
      </div> 
      </div>
      <div>
     
      </div>
        </div>
     
      </>
     
    );
};

export default TrainSearch;
