import React from 'react';
import { connect } from 'react-redux';

const TrainDetails = ({ trainDetails }) => {
  console.log(trainDetails);
  return (
    <div>
      <h2>Train Details</h2>
      {trainDetails ? (
        <ul>
          {trainDetails.map(train => (
            <li key={train.TrainId}>
              <p>Train Name: {train.TrainName}</p>
              <p>Train Number: {train.train_number}</p>
           
            </li>
          ))}
        </ul>
      ) : (
        <p>No trains found.</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  trainDetails: state.trainDetails,
});

export default connect(mapStateToProps)(TrainDetails);
