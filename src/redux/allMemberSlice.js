import { createSlice } from "@reduxjs/toolkit";

const allMemberSlice = createSlice({
  name: "allMemberSlice",
  initialState: {
    allMemStateTogg:false
  },
  reducers: {
    allMemToggAction: (state, action) => {
        return {
            ...state,
            allMemStateTogg:!state.allMemStateTogg
        }
    },
 
  },
});

export const { allMemToggAction } = allMemberSlice.actions;
export default allMemberSlice.reducer;
