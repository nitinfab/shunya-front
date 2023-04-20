import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "titleBar",
  initialState: [{ id: 0, name: "",currentTab:"",url:""}],
  reducers: {
    addTitle: (state, action) => {
      if (state.length >= 1) {
          var len = state.length;
             state.push({
            id: len,
            name: action.payload.name,
            currentTab:len,
            url:action.payload.url,
          });
        //  if(action.payload.name){
        //   var len = state.length;
        //   state.push({
        //     id: len,
        //     name: action.payload.name,
        //     currentTab:"",
        //     url:""
        //   });
        //  }
        //  else{
        //   console.log("aiuuuuELLELLE")
        //   var len = state.length;
        //   state.push({
        //     id: len,
        //     name: "",
        //   });
        //  }
      }
      else {
        return state
      }
    },
    deleteTitle: (state, action) => {
      const newState = state.reduce((acc, curr, index) => {
        if (index != action.payload.value1) {
          return [...acc, curr];
        } else {
          return acc;
        }
      }, []);
      state = newState.map((ele, ind) => {
     var updatedUrl=JSON.stringify(ele.url).split("/")
     updatedUrl[3]=ind.toString()
        return { ...ele, id: ind,url:updatedUrl.join('/').replace(/"/g, '')};
      });
      return state;
    },
    updateTitle: (state, action) => {
      return state;
    },
    confirmPageTitle: (state, action) => {
      let newArray = [...state];

      return (state = newArray.map((ele, ind) => {
        if (ind == action.payload.value) {
          return {
            ...ele,
            name:action.payload.name,
            currentTab:state.length,
            url:action.payload.url
          };
        } else {
          return ele;
        }
      }));
    },
  },
});

export const { addTitle, deleteTitle, updateTitle, confirmPageTitle } =
  TabSlice.actions;

export default TabSlice.reducer;
