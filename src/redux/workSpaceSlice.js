import { createSlice } from "@reduxjs/toolkit";

export const workSpaceSlice = createSlice({
  name: "workspaceSlice",
  initialState: {
    toggleButton:false,
    workspaceCount:[]
  },
  reducers: {
    updateWorkSpace: (state, action) => {
       
            return {
                ...state,
                workspaceCount: [action.payload, ...state.workspaceCount]
              }
    },
    toggleWorkSpace:(state,action)=>{
        return {
            ...state,
            toggleButton: action.payload
          }

    }
 
  },
});

export const { updateWorkSpace,toggleWorkSpace } = workSpaceSlice.actions;
export default workSpaceSlice.reducer;
