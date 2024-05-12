

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLiveLocation = createAsyncThunk(
  'liveLocation/fetchLiveLocation',
  async () => {
    try {
      const response = await axios.get('https://railway-booking-3z2u.onrender.com/TrainDetails?');
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch live location data');
    }
  }
);
