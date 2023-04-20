import { createSlice } from "@reduxjs/toolkit";

export const myTaskSlice = createSlice({
  name: "myTaskDataSlice",
  initialState: [],
  reducers: {
    myTaskDataAction: (state, action) => {
          return action.payload;
    },

  },
});

export const { myTaskDataAction } = myTaskSlice.actions;
export default myTaskSlice.reducer;
