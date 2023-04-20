import { configureStore } from "@reduxjs/toolkit";
import toggButtonSlice from "./toggButtonSlice";
import TabSlice from "./TabSlice";
import currentProjectSlice from "./currentProjectSlice";
import branchPageSlice from "./branchPageSlice";
import bigSureSlice from "./bigSureSlice";
import domainPageSlice from "./domainPageSlice";
import domainToggSlice from "./domainToggSlice";
import TeamPageSlice from "./TeamPageSlice";
import prevSlice from "./prevSlice";
import workSpaceSlice from "./workSpaceSlice";
import PageNameSlice from "./PageNameSlice";
import tableSlice from "../Components/BranchPages/CalendarPage/components/eventSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
import workspaceDataSlice from "./workspaceDataSlice";
import myTaskSlice from "./myTaskSlice";
import viewSlice from "./viewSlice";
import ProjectNameSlice from "./ProjectNameSlice";
import  CalendarSlice  from "./CalendarSlice";
import TaskInfoSlice from "./TaskInfoSlice";
import labelContSlice from "./labelContSlice";
import DomCalendarSlice from "./DomCalendarSlice";
import allMemberSlice from "./allMemberSlice";
import parentIdSlice from "./parentIdSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['workspaceDataB','PageNameB','ProjectNameB','labelContB','allMemberStateB','parentIdB']
};
const rootReducer = combineReducers({
  bisurB: bigSureSlice,
  PageNameB: PageNameSlice,
  ProjectNameB:ProjectNameSlice,
  workSpaceState: workSpaceSlice,
  labelContB:labelContSlice,
  CalendarStateB:CalendarSlice,
  DomCalendarStateB:DomCalendarSlice,
  allMemberStateB:allMemberSlice,
  parentIdB:parentIdSlice,

  teamButton: toggButtonSlice,
  tab: TabSlice,
  currentProject: currentProjectSlice,
  branchPage: branchPageSlice,
  domainPageredux: domainPageSlice,
  domainTask: domainToggSlice,
  allTeamPageDetail: TeamPageSlice,
  tabPrevState: prevSlice,
  table: tableSlice,
  ViewNameB:viewSlice,
  workspaceDataB: workspaceDataSlice,
  mytaskDataB:myTaskSlice,
  TaskInfoStateB:TaskInfoSlice,


});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
