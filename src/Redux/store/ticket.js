// trainSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const trainSlice = createSlice({
  name: 'trains',
  initialState: {
    trainData: [],
    loading: false,
    error: null,

    
  },
  reducers: {
    fetchTrainDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTrainDataSuccess(state, action) {
      state.loading = false;
      state.trainData = action.payload;
    },
    fetchTrainDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchTrainDataStart, fetchTrainDataSuccess, fetchTrainDataFailure } = trainSlice.actions;

export default trainSlice;
