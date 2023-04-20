import { createSlice } from "@reduxjs/toolkit";

const ProjectNameSlice = createSlice({
  name: "ProjectName",
  initialState: "",
  reducers: {
    projectNameButton: (state, action) => {
      if(action.payload)
      {
        if(action.payload==state)
        return state;
        else
      return action.payload;
      }
      else return state
    },
  },
});

export const { projectNameButton } = ProjectNameSlice.actions;
export default ProjectNameSlice.reducer;
