import { createSlice } from "@reduxjs/toolkit";

export const domainToggSlice = createSlice({
  name: "domainButton",
  initialState: {
    domainUpdateValue: false,
    value: true,
    name: "",
    domainId:"",
    domainName:"",
    checkTaskAdded:false,
  },
  reducers: {
    domainTaskTogg: (state, action) => {
      state.value = !state.value;
    },
    domainUpdate: (state) => {
      state.domainUpdateValue = !state.domainUpdateValue;
    },
    domainNameUpdate: (state,action) => {
         state.name = action.payload.name;
  state.domainId = action.payload.domainID;
      },
      checkTaskAddedAction: (state) => {
        state.checkTaskAdded = !state.checkTaskAdded;
      },
      domainNameToggle:(state,action)=>{
        state.domainName=action.payload
      },
   resetDomainState : (state) => {
       
   state= {
      domainUpdateValue: false,
      value: true,
      name: "",
      domainId:"",
      domainName:"",
      checkTaskAdded:false,
    }
    return state;
  },
    
  },
});

export const { domainTaskTogg, domainUpdate,domainNameUpdate,checkTaskAddedAction,domainNameToggle,resetDomainState } = domainToggSlice.actions;
export default domainToggSlice.reducer;
