import { createSlice } from "@reduxjs/toolkit";
export const bigSureSlice = createSlice({
  name: "bigSureButton",
  initialState: false,
  reducers: {
    bigsurButtton: (state,action) => {
      return !state ;
    },
  },
});

export const { bigsurButtton } = bigSureSlice.actions;
export default bigSureSlice.reducer;
