import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "viewName",
  initialState: "list",
  reducers: {
    viewButton: (state, action) => {
      return action.payload;
    },
  },
});

export const { viewButton } = viewSlice.actions;
export default viewSlice.reducer;
