import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const TrainDetailsCard = ({train}) => {
  
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{train.TrainName}</h5>
            <p className="card-text">Train Number: {train.train_number}</p>
            <p className="card-text">Source: {train.source}</p>
            <p className="card-text">Destination: {train.destination}</p>
           
          </div>
        </div>
      );
  
}

export default TrainDetailsCard
