// trainBookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTrain: [],
  selectedClass: null,
  passengers: [],
  availableSeats: [],
  totalAmount: 0,
  ticketInfoByUser: {},
};

const trainBookingSlice = createSlice({
  name: 'trainBooking',
  initialState,
  reducers: {
    selectTrain(state, action) {
      state.selectedTrain = action.payload;
    },
    selectClass(state, action) {
      state.selectedClass = action.payload;
    },
    addPassenger(state, action) {
      state.passengers.push(action.payload);
    },
    updateAvailableSeats(state, action) {
     
    },
   
    storeTicketInfo(state, action) {
        const { user, ticketInfo } = action.payload;
        state.ticketInfoByUser[user] = ticketInfo;
      },
  },
});

export const {
  selectTrain,
  selectClass,
  addPassenger,
  updateAvailableSeats,
  calculateTotalAmount,
  storeTicketInfo,
} = trainBookingSlice.actions;

export default trainBookingSlice;
