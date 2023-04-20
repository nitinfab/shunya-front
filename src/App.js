import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Navigate, useHistory, useNavigate } from "react-router-dom";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./Pages/Signup/Signup.jsx";
import Project from "./Pages/Project/Project";
import Home from "./Pages/Home/Home";
import WorkSpace from "./Components/BranchPages/WorkSpace";
import Overview from "./Components/BranchPages/WorkSpacePages/Overview";
import Domain from "./Components/BranchPages/WorkSpacePages/Domain";
import Roadmap from "./Components/BranchPages/WorkSpacePages/Roadmap";
import Space from "./Components/BranchPages/WorkSpacePages/Space";
import Main from "./Components/BranchPages/MainPage/Main";
import TeamAdd from "./Components/BranchPages/TeamAdd";
import MainCont from "./Components/BranchPages/MainPage/MainCont";
import Calendar from "./Components/BranchPages/CalendarPage/Calendar.jsx";
import List from "./Components/BranchPages/WorkSpacePages/DomainPages/BacklogPage/List";
import KanCard from "./Components/BranchPages/WorkSpacePages/DomainPages/BacklogPage/KanCard";
import TaskCalendar from "./Components/BranchPages/WorkSpacePages/DomainPages/BacklogPage/TaskCalendar";
import TaskList from "./Components/BranchPages/WorkSpacePages/DomainPages/BacklogPage/TaskList";
import Mytask from "./Components/BranchPages/MyTask/Mytask";
import Reports from "./Components/BranchPages/Report/Reports";
import MainSpace from "./Components/BranchPages/Spaces/MainSpace";
import CommonWorkSpace from "./Pages/WorkSpace/CommonWorkSpace";
import MytaskCont from "./Components/BranchPages/MyTask/MyTaskPage/MytaskCont";
import Issues from "./Components/BranchPages/MyTask/MyTaskPage/Issues";
import Sub from "./Components/BranchPages/MyTask/MyTaskPage/Sub";
import Files from "./Components/BranchPages/MyTask/MyTaskPage/Files";
import Review from "./Components/BranchPages/MyTask/MyTaskPage/Review";
import MyTaskOverview from "./Components/BranchPages/MyTask/MyTaskPage/MyTaskOverview";
import DomainTaskCont from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskCont";
import DomainTaskOver from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskOver";
import DomainTaskSub from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskSub";
import DomainTaskIssues from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskIssues";
import DomainTaskFiles from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskFiles";
import DomainTaskReview from "./Components/BranchPages/WorkSpacePages/DomainTaskPages/DomainTaskReview";







function App() {


  return (
    <div className="main_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route exact path="/project/:wheretosign" element={<Project />} />
          <Route exact path="/project/workSpace" element={<CommonWorkSpace />} />
          <Route exact path="/home" element={<Home />} >
            <Route exact path="/home" element={<MainCont />} >
              <Route exact path="/home/:projectname/:tabid/home" element={<Main />} />
            </Route>
            <Route exact path="/home/:projectname/:tabid/:workspace" element={<WorkSpace />} >
              <Route exact path="/home/:projectname/:tabid/:workspace/overview" element={<Overview />} />
              <Route exact path="/home/:projectname/:tabid/:workspace/teamAdd" element={<TeamAdd />} />
              {/* <Route exact path="/home/:projectname/:tabid/workspace/member" element={<TeamAdd />} /> */}

              <Route exact path="/home/:projectname/:tabid/:workspace/domains" element={<Domain />} >
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list" element={<List />} >
                  <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage" element={<TaskList />} >
          
                  </Route>
           
                </Route>
              </Route>
              <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/" element={<DomainTaskCont />} >
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/Overview" element={<DomainTaskOver />} />
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/Sub" element={<DomainTaskSub />} />
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/Issues" element={<DomainTaskIssues />} />
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/Files" element={<DomainTaskFiles />} />
                <Route exact path="/home/:projectname/:tabid/:workspace/domains/:pageNavName/list/:taskPage/:DomainTaskName/Review" element={<DomainTaskReview/>} />
                      
                  </Route>
              <Route exact path="/home/:projectname/:tabid/:workspace/roadMap" element={<Roadmap />} />
              <Route exact path="/home/:projectname/:tabid/:workspace/spaces" element={<Space />} />
            </Route>
            <Route exact path="/home/:projectname/:tabid/calendar/:days" element={<Calendar />} />
            <Route exact path="/home/:projectname/:tabid/report" element={<Reports />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket" element={<Mytask />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName" element={<MytaskCont/>}>
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName/Overview" element={<MyTaskOverview />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName/Sub" element={<Sub />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName/Issues" element={<Issues />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName/Files" element={<Files />} />
            <Route exact path="/home/:projectname/:tabid/mytask/:taskTicket/:taskName/Review" element={<Review />} />

            </Route>

            <Route exact path="/home/:projectname/:tabid/spaces" element={<MainSpace />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
