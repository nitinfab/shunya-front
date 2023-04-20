import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "./Branch.module.css";
import dash_icon from "../../assets/DashboardIcon.svg";
import connect_icon from "../../assets/Connect_icon.svg";
import bank_icon from "../../assets/Bank_icon.svg";
import home from "../../assets/home.svg";
import homeW from "../../assets/homeW.svg";
import calendar from "../../assets/calender.svg";
import calendarW from "../../assets/calendarW.svg";
import star from "../../assets/star.svg";
import ADD from "../../assets/ADD.svg";
import random from "../../assets/4781669.png";

import note from "../../assets/note.svg";
import report from "../../assets/report.svg";
import reportW from "../../assets/reportW.svg";
import task from "../../assets/task.svg";
import taskW from "../../assets/taskW.svg";
import workspace1 from "../../assets/workspace.svg";
import workspace1W from "../../assets/workspace1W.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleWorkSpace } from "../../redux/workSpaceSlice";
import { pageNameButton } from "../../redux/PageNameSlice";
import { confirmPageTitle } from "../../redux/TabSlice";
import { projectNameButton } from "../../redux/ProjectNameSlice";
import { viewButton } from "../../redux/viewSlice";
import { myTaskDataAction } from "../../redux/myTaskSlice";
import { resetDomainState } from "../../redux/domainToggSlice";
function BranchMenu() {
  const dispatch = useDispatch();
  const { projectname, tabid } = useParams();
  const navigate = useNavigate();
  const workSpaceValue = useSelector((state) => state.workSpaceState);
  const projectNameValue = useSelector((state) => state.ProjectNameB);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  let titleBarValue = useSelector((state) => state.tab);
  const [workspaceCount, setWorkspaceCount] = useState();
  const [workSpaceTogg, setWorkSpaceTogg] = useState(false);
  const pageName = window.location.pathname.split("/");
  const fetchData = async () => {
    let res, data;
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));
    // Here We Checking Manual or google Because of Login
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
    } else {
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
      console.log("Fetching User Not success", data);
    } else {
      let userObb;
      // Set Number of Workspace of Projects.
      setWorkspaceCount(
        data.updatedUser.projects.find((ele, ind) => {
          if (ele.projectName == projectname) return ele;
        })?.workSpace
      );
      if (projectNameValue == "") {
        dispatch(projectNameButton(data.updatedUser.projects[0].projectName));
      }
      let tokenObject = JSON.parse(localStorage.getItem("userToken"));
      if (!tokenObject.projectName) {
        userObb = {
          tokenGen: data.updatedUser.token,
          tokenStatus: "manual",
          projectName: data.updatedUser.projects[0].projectName,
          userName: data.updatedUser.name,
        };
        localStorage.setItem("userToken", JSON.stringify(userObb));
      }
      
      // Set initial tab Project.
      if (titleBarValue.length == 1 && titleBarValue[0].name == "") {
        dispatch(
          confirmPageTitle({
            value: 0,
            name: data.updatedUser.projects[0].projectName,
            url: `/home/${data.updatedUser.projects[0].projectName}/0/home`,
          })
        );
      }

    }
  };

  async function myTaskFunc() {
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    let res = await fetch(`http://localhost:8000/user/myTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "manual",
        tokenData: {
          token: tokenObject.tokenGen,
          project: pageName[2],
        },
      }),
    });
    let data = await res.json();

    if (data.status == 422) console.log("Error to insert in MyTask");
    else {
      dispatch(viewButton("list"));
      dispatch(
        myTaskDataAction(
          data.updatedUser.projects.find((ele, ind) => {
            if (ele.projectName == projectNameValue) return ele;
          }).myTask
        )
      );
    }
  }
  useEffect(() => {
    fetchData();
    if (myTaskStateValue.length == 0) {
      myTaskFunc();
    }
  }, [workSpaceValue.workspaceCount, pageName[2]]);
  useEffect(()=>{
    async function AddLabels() {
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  
      let res = await fetch(`http://localhost:8000/user/Labels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "manual",
          tokenData: {
            token: tokenObject.tokenGen,
            project: pageName[2],
            newLabel:false,
          },
          labelDetail:{
            name:"",
            value:""
          }
        }),
      });
      let data = await res.json();
  
      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
        dispatch(viewButton("list"));
        dispatch(
          myTaskDataAction(
            data.updatedUser.projects.find((ele, ind) => {
              if (ele.projectName == projectNameValue) return ele;
            }).myTask
          )
        );
      }
    }
   AddLabels();
  },[])
  return (
    <>
      {/* ////////////////////////    Branch Items  ///////////////////////////   */}
      <div className={styled.branch_menu}  
      onClick={()=>{
        dispatch(resetDomainState())
        dispatch(viewButton("list"))
      }}
      >
        <div
          className={
            pageName[4] === "home"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
          onClick={() => {
            dispatch(pageNameButton("Home"));

            navigate(`/home/${projectname}/${tabid}/home`);
          }}
        >
          <div className={styled.branch_menu_item_right}>
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img src={pageName[4] === "home" ? homeW : home} alt="image" />
            </div>
            <div
              className={styled.branch_menu_text}
              style={{ color: pageName[4] === "home" ? "#fff" : "" }}
            >
              Home
            </div>
          </div>
          <div></div>
        </div>

        <div
          className={
            pageName[4] === "mytask"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onClick={() => {
              dispatch(pageNameButton("myTask"));

              navigate(`/home/${projectname}/${tabid}/mytask/all`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img src={pageName[4] === "mytask" ? taskW : task} alt="image" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                className={styled.branch_menu_text}
                onClick={() => {}}
                style={{ color: pageName[4] === "mytask" ? "#fff" : "" }}
              >
                My tasks
              </div>

              <div onClick={() => {}}>
                <div>
                  <i
                    className="fa-solid fa-caret-down"
                    style={{ color: pageName[4] === "mytask" ? "#fff" : "" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /////////////////////////// */}
        <div
          className={
            pageName[4] === "report"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onClick={() => {
              dispatch(pageNameButton("Reports"));

              navigate(`/home/${projectname}/${tabid}/report`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img
                src={pageName[4] === "report" ? reportW : report}
                alt="image"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                className={styled.branch_menu_text}
                onClick={() => {}}
                style={{ color: pageName[4] === "report" ? "#fff" : "" }}
              >
                Reports
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {/* //////////////////////////////// */}
        <div
          className={
            pageName[4] === "calendar"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onClick={() => {
              dispatch(pageNameButton("Calendar"));

              navigate(`/home/${projectname}/${tabid}/calendar/month`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img
                src={pageName[4] === "calendar" ? calendarW : calendar}
                alt="image"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={styled.branch_menu_text}
                style={{ color: pageName[4] === "calendar" ? "#fff" : "" }}
              >
                Calendar
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            pageName[4] === "spaces"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onClick={() => {
              dispatch(pageNameButton("Spaces"));

              navigate(`/home/${projectname}/${tabid}/spaces`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img
                src={pageName[4] === "spaces" ? calendarW : calendar}
                alt="image"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={styled.branch_menu_text}
                style={{ color: pageName[4] === "spaces" ? "#fff" : "" }}
              >
                Spaces
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            pageName[4] === "starred"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onClick={() => {
              // dispatch(pageNameButton("Starred"))
              // navigate(`/home/${projectname}/${tabid}/workspace/Overview`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img
                src={pageName[4] === "starred" ? workspace1W : star}
                alt="image"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={styled.branch_menu_text}
                style={{ color: pageName[4] === "starred" ? "#fff" : "" }}
              >
                Starred
              </div>
              <div onClick={() => {}}>
                <div>
                  <i
                    className="fa-solid fa-caret-down"
                    style={{ color: pageName[4] === "starred" ? "#fff" : "" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ border: ".25px solid #413E3E" }}></div>
        </div>
        <div
          className={
            pageName[4] === "workspace"
              ? styled.branch_menu_item_togg
              : styled.branch_menu_item
          }
        >
          <div
            className={styled.branch_menu_item_right}
            onMouseEnter={() => {
              setWorkSpaceTogg(true);
            }}
            // onMouseLeave={() => {
            //   setWorkSpaceTogg(false);
            // }}
            onClick={() => {
              setWorkSpaceTogg(!workSpaceTogg);

              // navigate(`/home/${projectname}/${tabid}/workspace/Overview`);
            }}
          >
            <div
              style={{ width: "1.7rem", height: "1.7rem", marginRight: "1rem" }}
            >
              <img
                src={pageName[4] === "workspace" ? workspace1W : workspace1}
                alt="image"
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={styled.branch_menu_text}
                style={{ color: pageName[4] === "workspace" ? "#fff" : "" }}
              >
                Workspace
              </div>
              <div onClick={() => {}}>
                <div>
                  <i
                    className="fa-solid fa-caret-down"
                    style={{ color: pageName[4] === "workspace" ? "#fff" : "" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {workSpaceTogg ? (
          <div className={styled.workspaceContainer}>
            {workspaceCount &&
              workspaceCount.map((ele, ind) => {
                return (
                  <div
                    key={ind}
                    style={{ display: "flex", gap: "1rem" }}
                    onClick={() => {
                      dispatch(pageNameButton("Workspace"));

                      navigate(
                        `/home/${projectname}/${tabid}/${ele.name}/Overview`
                      );
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        border: "1px solid #7f7575",
                        borderRadius: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={random}
                        alt="random"
                        style={{ width: "1.5rem", height: "1.5rem",
                        
                         }}
                      />
                    </div>
                    <div
                      style={{ color: pageName[4] == ele.name ? "#fff" : "" ,
                      
                      }}
                    >
                      {ele.name}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3rem",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(toggleWorkSpace(true));
          }}
        >
          <img src={ADD} alt="dfdfsd" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </>
  );
}

export default BranchMenu;
