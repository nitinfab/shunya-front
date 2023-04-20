import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageFilter from "../PageFilter";
import PageNav from "../PageNav";
import styled from "./MyTaskPage/mytaskstyle.module.css"

import List from "../../BranchPages/MyTask/TaskView/List";

import { myTaskDataAction } from "../../../redux/myTaskSlice";
import MainKanban from "../WorkSpacePages/DomainPages/BacklogPage/KanbanCardM/MainKanban";
import TaskCalendar from "../WorkSpacePages/DomainPages/BacklogPage/TaskCalendar";
import { viewButton } from "../../../redux/viewSlice";
import { projectNameButton } from "../../../redux/ProjectNameSlice";
import { labelContStateValue } from "../../../redux/labelContSlice";
import { parentIdAction } from "../../../redux/parentIdSlice";

function Mytask() {
  const dispatch = useDispatch();
  const viewStateValue = useSelector((state) => state.ViewNameB);
  const projectStateValue = useSelector((state) => state.ProjectNameB);
  const labelContValue = useSelector((state) => state.labelContB);
  
  const [unassignM, setUnassignM] = useState([]);
  const pageName = window.location.pathname.split("/");
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const parentIdValue = useSelector((state) => state.parentIdB);



  const fetchData = async () => {
    let res, data;
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  if (tokenObject.tokenStatus === "manual") {
    res = await fetch(`http://localhost:8000/user/fetchDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: tokenObject.tokenGen,
        status: tokenObject.tokenStatus,
      }),
    });
  } 
  else {
    res = await fetch(`http://localhost:8000/user/fetchDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "google",
      }),
      credentials: "include",
    });
   
  }

  data = await res.json();
  if (data.status === 422) {
    console.log("Project Name Not Updated", data);
  } else {
        dispatch(myTaskDataAction(  data.updatedUser.projects.find((ele, ind) => {
          if (ele.projectName == projectStateValue) return ele;
        }).myTask))
        setUnassignM(data.updatedUser.AllMember)
        dispatch(labelContStateValue(data.updatedUser.projects.find((ele, ind) => {
          if (ele.projectName == projectStateValue) return ele;
        }).Labels))
  }

};

//////////  Call for PArent Id,
useEffect(()=>{
let targetedParent=myTaskStateValue.find((ele,ind)=>{
  if(ele.title==pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1))
  return ele;
})
if(targetedParent?._id)
   dispatch(parentIdAction(targetedParent?._id))
console.log("sjkdjhs4324234",targetedParent?._id)


},[window.location.pathname,pageName[5]])
  useEffect(()=>{
    fetchData()
  },[projectStateValue,labelContValue.stateValue])
  

  return (
    <div >
      <PageNav></PageNav>
      {viewStateValue==="card"? "":<PageFilter></PageFilter>}
      
      <div style={{ overflowY: "scroll", height: "72vh", }}>
         {viewStateValue=="list"?<List unassignM={unassignM}></List>:viewStateValue=="card"?<MainKanban></MainKanban>:<TaskCalendar></TaskCalendar> }  
      </div>
     
    </div>
  );
}

export default Mytask;
