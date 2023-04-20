import { createSlice } from "@reduxjs/toolkit";
export const TaskInfoSlice = createSlice({
  name: "TaskInfoSlice",
  initialState: {
    taskInfoToggValue:false,
    taskInfoTask:{}
  
  },
  reducers: {
    TaskInfoStateTogg: (state, action) => {
            return {
                ...state,
                taskInfoToggValue: action.payload
              }
    },
    TaskInfoTaskValue: (state, action) => {
            return {
                ...state,
                taskInfoTask:action.payload
              }
    }
  },
});

export const { TaskInfoStateTogg,TaskInfoTaskValue } = TaskInfoSlice.actions;
export default TaskInfoSlice.reducer;
