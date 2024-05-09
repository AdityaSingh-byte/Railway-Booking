// rootReducer.js
import { combineReducers } from 'redux';
import trainReducer from './trainReducer'; // Assuming you have a trainReducer

const rootReducer = combineReducers({
  trains: trainReducer,
 
});

export default rootReducer;
