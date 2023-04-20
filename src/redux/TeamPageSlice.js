import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router";

const TeamPageSlice = createSlice({
  name: "teamPageDetail",
  initialState: {
    id:"",
    teamName:""
  },
  reducers: {
    teamNamePanel: (state, action) => {
      if(action.payload)
      {
      state.teamName= action.payload.teamName;
      state.id=action.payload.teamID;
      }
else{
  return state
}
    },
  },
});

export const { teamNamePanel } = TeamPageSlice.actions;
export default TeamPageSlice.reducer;
