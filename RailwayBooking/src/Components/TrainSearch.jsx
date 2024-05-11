import React, { useState } from 'react';
import axios from 'axios';

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
          <p>Destination: {searchResult.destination}</p>
          <p>Departure Time: {searchResult.departure_time}</p>
          <p>Arrival Time: {searchResult.arrival_time}</p>
          <h3>Classes</h3>
          <ul>
            {searchResult.Classes.map((classInfo, index) => (
              <li key={index}>
                Class: {classInfo.Class}, Seats: {classInfo.Seats}, 
              </li>
            ))}
          </ul>
         
          <h3>Current Location</h3>
          <p>{searchResult.current_location[0].Running_station}</p>
        </div>
      )}
    </div>
  );
};

export default TrainSearch;
