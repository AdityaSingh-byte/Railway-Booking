
import { combineReducers } from 'redux';
import trainReducer from './trainReducer';

const rootReducer = combineReducers({
  trains: trainReducer,
 
});

export default rootReducer;
