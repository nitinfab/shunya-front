import { createSlice } from "@reduxjs/toolkit";

const currentProjectSlice = createSlice({
  name: "projectCurrentDetail",
  initialState: null,
  reducers: {
    currentProjectUpdate: (state, action) => {
return action.payload;
   
    },
  },
});

export const { currentProjectUpdate } = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
