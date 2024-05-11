// TrainSearch.js

import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchTrains } from '../Redux/Action/TrainTicket';
import TrainDetailsCard from './TrainDetailsCard';

const TrainSearch = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
  
    const dispatch = useDispatch();
    const trainData = useSelector((state) => state.train.trainData);
    const handleSearch = () => {
      dispatch(searchTrains(source, destination));
    };
    console.log(trainData);
  
    return (
        <>
       
      <div>
        <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
        <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSearch}>Search Trains</button>
      </div>
      <div>
        <div className="row">
        {trainData && trainData.length>0 && trainData.map((train) => (
          <div key={train.TrainId} className="col-md-4 mb-3">
            <TrainDetailsCard train={train} />
          </div>
        ))}
      </div>
      </div>
      </>
     
    );
};

export default TrainSearch;
