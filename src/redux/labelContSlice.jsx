import { createSlice } from "@reduxjs/toolkit";

export const labelContSlice = createSlice({
  name: "labelContState",
  initialState: {
     stateValue:false,
    value:[]
  },
  reducers: {
    labelContStateTogg: (state, action) => {
        return {
            ...state,
            stateValue: !state.stateValue,
            
          }
},
labelContStateValue:(state, action) => {
    return {
        ...state,
        value: action.payload
      }
},

  },
});

export const {labelContStateValue,labelContStateTogg} = labelContSlice.actions;
export default labelContSlice.reducer;