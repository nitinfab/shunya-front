import { createSlice } from "@reduxjs/toolkit";

const prevSlice = createSlice({
  name: "prevStateValue",
  initialState: {
    currentValue:"0",
    previousValue:"0"
  },
  reducers: {
    setprevSliceValue: (state, action) => {
        if(action.payload){
      return state.previousValue= action.payload.previousValue;
        }
        else{
            return state
        }
    },
    setcurrSliceValue: (state, action) => {
       state.previousValue=state.currentValue;
       state.currentValue=action.payload.currentValue;
      
    },
  },
});

export const { setprevSliceValue,setcurrSliceValue } = prevSlice.actions;
export default prevSlice.reducer;
