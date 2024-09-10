import { configureStore } from '@reduxjs/toolkit'
import auth from "./Slices/authSlice";
import filteredBus from "./Slices/filteredBusSlice"

export const store = configureStore({
  reducer: {
    auth ,
    filteredBus
  },
});