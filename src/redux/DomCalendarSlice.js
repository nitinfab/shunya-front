import { createSlice } from "@reduxjs/toolkit";
export const DomCalendarSlice = createSlice({
  name: "DomCalendarSlice",
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
    DomCalendarStateTogg: (state, action) => {
            return {
                ...state,
                calendarState: action.payload.stateValue,
                targetId:action.payload.Id
                
              }
    },
    DomCalendarStateValue:(state, action) => {
        return {
            ...state,
            value: action.payload
          }
},
DomprofileStateTogg:(state, action) => {
  return {
      ...state,
     otherValue:{
      ...state.otherValue,
      profileState: action.payload.stateValue,
      targetId:action.payload.Id
     }
    }
},
DomprofileStateValue:(state, action) => {
  return {
      ...state,
     otherValue:{
      ...state.otherValue,
     value:action.payload,
     }
    }
},
DomlabelStateTogg:(state, action) => {
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
DomlabelStateValue:(state, action) => {

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

export const { DomCalendarStateTogg,DomCalendarStateValue,DomprofileStateTogg,DomprofileStateValue,DomlabelStateTogg,DomlabelStateValue } = DomCalendarSlice.actions;
export default DomCalendarSlice.reducer;
