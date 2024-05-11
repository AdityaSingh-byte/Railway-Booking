import React,{useEffect,useState} from 'react'

import { fetchLiveLocation } from '../Redux/Action/LiveLocationAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
    <div>
      <input
        type="text"
        placeholder="Enter Train Number"
        value={trainNumber}
        onChange={(e) => setTrainNumber(e.target.value)}
      />
      <button onClick={handleTrainSearch}>Search</button>

      {searchResult && (
        <div>
          <h2>Train Details</h2>
          <p>Train Name: {searchResult.TrainName}</p>
          <p>Source: {searchResult.source}</p>
          <p>Next Destination: {searchResult.destination}</p>
          <p>Arrival Time: {searchResult.arrival_time}</p>
         
          <h3>Current Location</h3>
          <p>{searchResult.current_location}</p>
        </div>
      )}
    </div>
  );
}

export default TrailLive
