import React ,{useState}from 'react'
import axios from 'axios';
const PNRcomponent = () => {
    const [pnr, setPNR] = useState('');
    const [trainDetails, setTrainDetails] = useState(null);
    const [error, setError] = useState('');
  
    const handlePNRChange = (event) => {
      setPNR(event.target.value);
    };
  
    const fetchPNRDetails = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://irctc1.p.rapidapi.com/api/v3/getPNRStatus',
          params: {
            pnrNumber: pnr
          },
          headers: {
            'X-RapidAPI-Key': '66cec02916msh6a1acbe64153876p1ad80djsn22718d39cb48',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
          }
        };
  
        const response = await axios.request(options);
        if (response.data.status) {
          setTrainDetails(response.data.data);
          console.log(response.data.data);
          setError('');
        } else {
          setTrainDetails(null);
          setError('The PNR is incorrect');
        }
      } catch (error) {
        console.error('Error fetching PNR details:', error);
        setError('Something went wrong. Please try again later.');
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter PNR"
          value={pnr}
          onChange={handlePNRChange}
        />
        <button onClick={fetchPNRDetails}>Check PNR</button>
        {error && <div>{error}</div>}
        {trainDetails && (
          <div>
            <h2>Train Details</h2>
            <p>PNR: {trainDetails.Pnr}</p>
            <p>Train No: {trainDetails.TrainNo}</p>
            <p>Train Name: {trainDetails.TrainName}</p>
            <p>Boarding Station: {trainDetails.BoardingPoint}</p>
           
         
          </div>
        )}
      </div>
    );
}

export default PNRcomponent
