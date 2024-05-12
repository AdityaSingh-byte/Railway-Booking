
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrainDetails = createAsyncThunk(
  'trainBooking/fetchTrainDetails',
  async ({ source, destination }) => {
    try {
      const response = await axios.get(`https://railway-booking-3z2u.onrender.com/TrainDetails?source=${source}&destination=${destination}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
