import axios from 'axios';
import { SEARCH_TRAINS_REQUEST, SEARCH_TRAINS_SUCCESS, SEARCH_TRAINS_FAILURE } from './TActionTypes';

export const searchTrains = (searchTerm) => {
    return async (dispatch) => {
      dispatch({ type: SEARCH_TRAINS_REQUEST });
      try {
        const response = await axios.get(`http://localhost:3000/TrainDetails?train_number=${searchTerm}`);
        dispatch({ type: SEARCH_TRAINS_SUCCESS, payload: response.data });
        console.log(response.data);
        console.log(response.data);
      } catch (error) {
        dispatch({ type: SEARCH_TRAINS_FAILURE, error: error.message });
      }
    };
  };