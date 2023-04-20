import { createSlice } from "@reduxjs/toolkit";

const branchPageSlice = createSlice({
  name: "branchPage",
  initialState: "",
  reducers: {
    setBranchPage: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBranchPage } = branchPageSlice.actions;
export default branchPageSlice.reducer;
