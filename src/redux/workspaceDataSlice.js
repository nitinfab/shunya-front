import { createSlice } from "@reduxjs/toolkit";

export const workspaceDataSlice = createSlice({
  name: "workspaceData",
  initialState: [],
  reducers: {
    workspaceDataAction: (state, action) => {
          return action.payload;
    },

  },
});

export const { workspaceDataAction } = workspaceDataSlice.actions;
export default workspaceDataSlice.reducer;