// TrainSearch.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchTrains } from '../Redux/Action/TrainActions';
import TrainDetails from './TrainDetails'; // Import the TrainDetails component

const TrainSearch = ({ searchTrains, trainDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTrains(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by train number" />
        <button type="submit">Search</button>
      </form>
      {trainDetails && trainDetails.length > 0 ? (
        <TrainDetails trainDetails={trainDetails} />
      ) : (
        <p>No trains found.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  trainDetails: state.trainDetails,
  
});
// Connect the component to the Redux store
// console.log(trainDetails);

export default connect(mapStateToProps, { searchTrains })(TrainSearch);
