import { createSlice } from "@reduxjs/toolkit";

const domainPageSlice = createSlice({
  name: "domainPageUpdateDetail",
  initialState: "list",
  reducers: {
    domainPageUpdate: (state, action) => {
      if(action.payload)
return action.payload;
else{
  return state
}
    },
  },
});

export const { domainPageUpdate } = domainPageSlice.actions;
export default domainPageSlice.reducer;
