import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";
import trainSlice from "./ticket";
import liveLocationSlice from "./LiveLocation-slice";

const store = configureStore({
    reducer: {
       auth:authSlice.reducer,
       user:userSlice.reducer,
      train:trainSlice.reducer,
      liveLocation:liveLocationSlice.reducer,
    }
});

export default store;