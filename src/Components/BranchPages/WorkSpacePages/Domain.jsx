import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router'
import { workspaceDataAction } from '../../../redux/workspaceDataSlice';
import MainKanban from './DomainPages/BacklogPage/KanbanCardM/MainKanban';
import KanCard from './DomainPages/BacklogPage/KanCard';
import List from './DomainPages/BacklogPage/List';
import TaskCalendar from './DomainPages/BacklogPage/TaskCalendar';

function Domain() {
  const dispatch=useDispatch();
  const pageName = window.location.pathname.split("/");

  const domainPagerValue = useSelector((state) => state.domainPageredux);
  const ViewNameValue = useSelector((state) => state.ViewNameB);
  const workspaceValue = useSelector((state) => state.workspaceDataB);
  const projectNameValue = useSelector((state) => state.ProjectNameB);
   
  // useEffect(() => {
  //   const fetchProject = async () => {
  //     let res, data;
  //     const tokenObject = JSON.parse(localStorage.getItem("userToken"));

  //     if (tokenObject.tokenStatus === "manual") {
  //       res = await fetch(`http://localhost:8000/user/fetchDetail`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           data: tokenObject.tokenGen,
  //           status: tokenObject.tokenStatus,
  //         }),
  //       });
  //     }
  //     else {
  //       res = await fetch(`http://localhost:8000/user/fetchDetail`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json", 
  //         },
  //         body: JSON.stringify({
  //           source: "google",
  //         }),
  //         credentials: "include",
  //       });
  //     }
  //     data = await res.json();
  //     if (data.status === 422) {
  //       console.log("Project Name Not Updated", data);
  //     } else {
  //       console.log("Yes Project Name Successfully Updated", data.status);
  //        if(workspaceValue.length==0){
  //         dispatch(workspaceDataAction(data.updatedUser.projects.find((ele,ind)=>{
  // if(ele.projectName==projectNameValue)
  // return ele;
  //         }).workSpace.find((ele,ind)=>{
  //           if(ele.name==pageName[4])
  //           return ele;
  //         }).data))
  //        }
  //     }
  //   };
  //   fetchProject();
  // }, []);
  return ( 
    <>
 {ViewNameValue==="list" ?<List/> :ViewNameValue ==="calender"? <TaskCalendar/>:<MainKanban/>}
    </>
  )
}

export default Domain