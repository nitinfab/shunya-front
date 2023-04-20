import { createSlice } from "@reduxjs/toolkit";

export const parentIdSlice = createSlice({
  name: "parentIdSlice",
  initialState: "",
  reducers: {
    parentIdAction: (state, action) => {
          return action.payload;
    },

  },
});

export const { parentIdAction } = parentIdSlice.actions;
export default parentIdSlice.reducer;
