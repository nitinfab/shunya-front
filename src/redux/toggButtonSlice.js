import { createSlice } from "@reduxjs/toolkit";
export const toggleButtonSlice = createSlice({
  name: "button",
  initialState: false,
  reducers: {
    toggleButton: (state,action) => {
      return action.payload ;
    },
  },
});

export const { toggleButton } = toggleButtonSlice.actions;
export default toggleButtonSlice.reducer;
