
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrainDetails = createAsyncThunk(
  'trainBooking/fetchTrainDetails',
  async ({ source, destination }) => {
    try {
      const response = await axios.get(`http://localhost:3000/TrainDetails?source=${source}&destination=${destination}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
