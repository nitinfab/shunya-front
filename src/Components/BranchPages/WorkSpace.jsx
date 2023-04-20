import React, { createContext, useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import styled from "./extra.module.css";
import PageFilter from "./PageFilter";
import PageNav from "./PageNav";
import PageTeam from "./PageTeam";
import { useDispatch, useSelector } from "react-redux";
import dash2 from "../../assets/dashboard2.svg";
import backlog from "../../assets/backlog.svg";
import priority from "../../assets/priority.svg";
import line from "../../assets/line.svg";
import { Link } from "react-router-dom";
import PageMem from "./PageMem";
import { workspaceDataAction } from "../../redux/workspaceDataSlice";
import { labelContStateValue } from "../../redux/labelContSlice";

function WorkSpace() {
  const location = useLocation();
  const dispatch=useDispatch()
  const {projectname,tabid,workspace}=useParams()
  const pageName = window.location.pathname.split("/");
  const teamButtonValue = useSelector((state) => state.teamButton);
  const memButtonValue = useSelector((state) => state.teamButton1);
  const ViewNameValue = useSelector((state) => state.ViewNameB);
  const projectStateValue = useSelector((state) => state.ProjectNameB);



  let domainPagerValue = useSelector((state) => state.domainPageredux);
  let workspaceStateValue = useSelector((state) => state.workspaceDataB);
  const [detailTab, setDeatilTab] = useState(false);

  const [teamTogg, setteamTogg] = useState(true);
  useEffect(() => {
    setteamTogg(!teamTogg);
  }, [teamButtonValue]);



useEffect(()=>{
  let res, data;
  const tokenObject = JSON.parse(localStorage.getItem("userToken"));
      async function fetchData(){
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
        data = await res.json();
        if (data.status === 422) {
          console.log("Project Name Not Updated", data);
        } else {
         
      dispatch(workspaceDataAction(data.updatedUser.projects.find((ele)=>{
        if(ele.projectName==projectname)
        return ele;
      }).workSpace.find((ele)=>{
        if(ele.name==workspace)
        return ele
      }).data))
      }

      }
      if(workspaceStateValue.length<1)
     fetchData()

},[])
   

useEffect(()=>{
  let res, data;
  const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  async function fetchData(){
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
    data = await res.json();
    if (data.status === 422) {
      console.log("Project Name Not Updated", data);
    } else {
     
  dispatch(workspaceDataAction(data.updatedUser.projects.find((ele)=>{
    if(ele.projectName==projectname)
    return ele;
  }).workSpace.find((ele)=>{
    if(ele.name==workspace)
    return ele
  }).data))
  }
  dispatch(labelContStateValue(data.updatedUser.projects.find((ele, ind) => {
    if (ele.projectName == projectStateValue) return ele;
  }).Labels))
  }
  dispatch(workspaceDataAction([]))
 fetchData()

},[workspace])



  return (
    <>
      <div className={styled.workSpaceStyle}>
        <PageNav setteamTogg={setteamTogg} teamTogg={teamTogg} />
        {teamButtonValue ? (
          location.state?.teamState == true ? (
            <PageTeam />
          ) : (
            <PageMem></PageMem>
          )
        ) : (
          ""
        )}
        {/* <PageFilter /> */}
        {ViewNameValue === "card" ? "" :  pageName[9]!=undefined? "":<PageFilter />}
        <div className={styled.outlinetstyle}>
          <Outlet />
          {pageName[5] === "Overview" && false ? (
            <div
              style={{
                // width: "32%",
                // display: "flex",
                // flexDirection: "row-reverse",
                position: "absolute",
                top: "27%",
                right: "1.5%",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  marginTop: "1rem",
                  marginRight: "1.2rem",
                }}
                onClick={() => {
                  setDeatilTab(!detailTab);
                }}
              >
                <img
                  src={dash2}
                  alt="dashboard"
                  style={{ width: "1.8rem", height: "1.8rem" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {detailTab ? (
            <div className={styled.detaiTabStyle}>
              <div
                style={{
                  display: "flex",
                  marginTop: "2rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  maxHeight: "3rem",
                }}
              >
                <div style={{ display: "flex", padding: "0rem 2rem" }}>
                  <div className={styled.section3_Left}>
                    <Link
                      to={"/home/workspace/Overview"}
                      className={true ? styled.link_togg : styled.link}
                      onClick={() => {
                        // setPageSelec("all");
                        // navigate("/home/workspace/Overview")
                      }}
                    >
                      <div className={styled.creationPage}>
                        <div>
                          <p style={{ fontSize: "1.3rem" }}>Overview</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className={styled.section3_Left}>
                    <Link
                      to={"/home/workspace/Overview"}
                      className={false ? styled.link_togg : styled.link}
                      onClick={() => {
                        // setPageSelec("all");
                        // navigate("/home/workspace/Overview")
                      }}
                    >
                      <div className={styled.creationPage}>
                        <div>
                          <p style={{ fontSize: "1.3rem" }}>Files & Links</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className={styled.section3_Left}>
                    <Link
                      to={"/home/workspace/Overview"}
                      className={false ? styled.link_togg : styled.link}
                      onClick={() => {
                        // setPageSelec("all");
                        // navigate("/home/workspace/Overview")
                      }}
                    >
                      <div className={styled.creationPage}>
                        <div>
                          <p style={{ fontSize: "1.3rem" }}>Teams</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    maxHeight: "3rem",
                    marginRight: "2rem",
                    overflow: "hidden",
                  }}
                >
                  <div>
                    <img
                      src={line}
                      style={{ height: "2.5rem", marginRight: "1rem" }}
                      alt="line"
                    />
                  </div>
                  <div
                    onClick={() => {
                      setDeatilTab(!detailTab);
                    }}
                  >
                    <img
                      src={dash2}
                      style={{ width: "1.8rem", height: "1.8rem" }}
                      alt="dashboard"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "5rem",
                  padding: "0rem 2rem ",
                  fontSize: "1.4rem",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ width: "5rem" }}>Status</div>
                  <div style={{ marginLeft: "6rem", display: "flex" }}>
                    <div>
                      <img src={backlog} alt="backlog" />
                    </div>
                    <div style={{ marginLeft: "1rem" }}>Backlog</div>
                  </div>
                </div>
                <div style={{ display: "flex", margin: "3rem 0rem" }}>
                  <div style={{ width: "5rem" }}>Priority</div>
                  <div style={{ marginLeft: "6rem", display: "flex" }}>
                    <div>
                      <img src={priority} alt="backlog" />
                    </div>
                    <div style={{ marginLeft: "1rem" }}>Urgent</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "5rem" }}>Labels</div>
                  <div style={{ marginLeft: "6rem", display: "flex" }}>
                    <div>
                      <img src={priority} alt="backlog" />
                    </div>
                    <div style={{ marginLeft: "1rem" }}>Urgent</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default WorkSpace;
