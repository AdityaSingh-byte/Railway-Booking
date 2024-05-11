// liveLocationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const liveLocationSlice = createSlice({
  name: 'liveLocation',
  initialState: {
    location: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationSuccess(state, action) {
      state.loading = false;
      state.location = action.payload;
    },
    fetchLocationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLocationStart, fetchLocationSuccess, fetchLocationFailure } = liveLocationSlice.actions;

export default liveLocationSlice;
