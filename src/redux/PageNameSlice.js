import { createSlice } from "@reduxjs/toolkit";

const PageNameSlice = createSlice({
  name: "PageName",
  initialState: "Home",
  reducers: {
    pageNameButton: (state, action) => {
      return action.payload;
    },
  },
});

export const { pageNameButton } = PageNameSlice.actions;
export default PageNameSlice.reducer;
