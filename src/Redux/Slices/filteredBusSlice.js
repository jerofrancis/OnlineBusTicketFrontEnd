import { createSlice } from "@reduxjs/toolkit";

const FilteredBus = localStorage.getItem('filteredBus');
const initialState = FilteredBus ? JSON.parse(FilteredBus) : [];


const filteredBusSlice = createSlice({
    name: 'filteredBus',
    initialState,
    reducers: {
        setFilteredBusState: (state, action) => {
          state.splice(0, state.length, ...action.payload);
        },
    }
  });
  
  
  export const {setFilteredBusState } = filteredBusSlice.actions;
  export default filteredBusSlice.reducer;
  