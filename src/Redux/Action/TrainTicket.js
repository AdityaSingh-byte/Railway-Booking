import axios from "axios";
import { fetchTrainDataSuccess } from "../store/ticket";

export const searchTrains = (source, destination) => async (dispatch) => {
    try {
    
      const response = await axios.get(`https://railway-booking-3z2u.onrender.com/TrainDetails?source=${source}&destination=${destination}`);
      
      dispatch(fetchTrainDataSuccess(response.data));
      

    } catch (error) {
      console.log(error);
    }
  };