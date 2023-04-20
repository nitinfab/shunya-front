import { createSlice } from "@reduxjs/toolkit";
export const CalendarSlice = createSlice({
  name: "CalendarSlice",
  initialState: {
    calendarState:false,
    targetId:"",
value:{
},
otherValue:{
  profileState:false,
  targetId:"",
  value:{}
},
labelValue:{
  labelState:false,
  targetId:"",
  value:[]
}
  },
  reducers: {
    CalendarStateTogg: (state, action) => {
            return {
                ...state,
                calendarState: action.payload.stateValue,
                targetId:action.payload.Id
                
              }
    },
    CalendarStateValue:(state, action) => {
        return {
            ...state,
            value: action.payload
          }
},
profileStateTogg:(state, action) => {
  return {
      ...state,
     otherValue:{
      ...state.otherValue,
      profileState: action.payload.stateValue,
      targetId:action.payload.Id
     }
    }
},
profileStateValue:(state, action) => {
  return {
      ...state,
     otherValue:{
      ...state.otherValue,
     value:action.payload,
     }
    }
},
labelStateTogg:(state, action) => {
  // return {
  //     ...state,
  //     labelValue:{
  //     ...state.labelValue,
  //     profileState: action.payload.stateValue,
  //     targetId:action.payload.Id
  //    }
  //   }
  console.log("Uuuyasas",JSON.stringify(action.payload))
  return {
    ...state,
    labelValue: {
      ...state.labelValue,
      labelState: action.payload.stateValue,
      targetId: action.payload.Id,
    },
  };
},
labelStateValue:(state, action) => {

  // return {
  //   ...state,
  //   labelValue:[
  //     {
  //       ...state.labelValue,
  //      value:action.payload,
  //      status:"",
  //      }
  //   ]
  // }


  return {
    ...state,
    labelValue: {
      ...state.labelValue,
      value: [
        ...state.labelValue.value,
        action.payload
      ]
    }
  };
},
  },
});

export const { CalendarStateTogg,CalendarStateValue,profileStateTogg,profileStateValue,labelStateTogg,labelStateValue } = CalendarSlice.actions;
export default CalendarSlice.reducer;
