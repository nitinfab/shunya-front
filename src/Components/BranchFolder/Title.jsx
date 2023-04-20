import React, { useDispatch, useSelector } from "react-redux";
import styled from "./Title.module.css";
// import * as XLSX from "xlsx";
import group1 from "../../assets/Group1.png";
import group2 from "../../assets/Group2.png";
import group6 from "../../assets/share.svg";
import group4 from "../../assets/Group4.png";
import ADD from "../../assets/ADD.svg";
import cross from "../../assets/cross.svg";
import search from "../../assets/search.svg";
import group3 from "../../assets/bell.svg";
// import { CSVLink } from "react-csv";
import { useState } from "react";
// import Tab from "../../BranchPages/DashBoard/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import Tab from "../BranchPages/Tab";
import { currentProjectUpdate } from "../../redux/currentProjectSlice";
import { confirmPageTitle } from "../../redux/TabSlice";
import { toggleWorkSpace } from "../../redux/workSpaceSlice";
import { updateWorkSpace } from "../../redux/workSpaceSlice";
import {persistStore} from "redux-persist";
import { store } from "../../redux/store";
// import { postData } from "../../BranchPages/DashBoard/Dashboard";
// import { tableButton } from "../../../redux/tableSlice";
function Title() {
  const tokenObject = JSON.parse(localStorage.getItem("userToken"));
const {projectname}=useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSelec, setPageSelec] = useState("");
  const [workSpaceName,setWorkSpaceName]=useState({
    workspaceName:""
  })
  const [searchBarState,setSearchBarState]=useState(false)
  // const [profileUrl, setProfileUrl] = useState("");
  const [logoutState, setlogoutState] = useState(false);
  const [workspacePanel,setWorkspacePanel]=useState(false)
  const [addTask, setAddTask] = useState(false);
  const dropDownRef = useRef(null);
  const dropDownRef1 = useRef(null);

  const [data, setData] = useState([]);
  const currentProjectValue = useSelector((state) => state.currentProject);
  const workSpaceValue = useSelector((state) => state.workSpaceState);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  let titleBarValue = useSelector((state) => state.tab);



  const FetchUser = async () => {
    let res, data;

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
  else{
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
    console.log("User  Not Fetch", data);
  } else {
    if (currentProjectValue === null) {
      dispatch(
        currentProjectUpdate(data.updatedUser.projects[0].projectName)
      );
      if(titleBarValue.length==1 && titleBarValue[0].name==""){     dispatch(confirmPageTitle({
        name: data.updatedUser.projects[0].projectName,
        value: 0,
        url:`/home/${projectname}/0/home`
      }))}
    }
    // setProfileUrl(data.updatedUser.name.charAt(0).toUpperCase());

    if(!tokenObject.tokenGen){
      let userObb = {
        tokenGen: data.updatedUser.token,
        tokenStatus: "manual",
        projectName:data.updatedUser.projects[0].projectName,
        userName:data.updatedUser.name,
      };
      localStorage.setItem("userToken", JSON.stringify(userObb));
    }






  }
     
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setlogoutState(false);
    }
  }
  useEffect(() => {
    FetchUser();
  }, [window.location.pathname]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, []);

  function handleClickOutside1(event) {
    if (dropDownRef1.current && !dropDownRef1.current.contains(event.target)) {
      setAddTask(false);
    }
  }
  const handleWorkSpaceClick = (event) => {
    if (event.target.classList.contains("WorkSpace")) {
        dispatch(toggleWorkSpace(true))
    }
    else{
    console.log("dasjdashdhash")

    }
  };
  ///////////////////////////////////
  const editable1SubRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target === editable1SubRef.current) {
      setSearchBarState(false)
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

 
  const AddWorkspace = async (userData) => {
    let res, data;
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    if (true) {
      if (tokenObject.tokenStatus === "manual") {
        res = await fetch(`http://localhost:8000/user/workspace`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: userData,
            source: "manual",
            tokenData:{
              token: tokenObject.tokenGen,
              project:tokenObject.projectName
            }
          }),
        });
      } 
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Yes Domain inidtail",);
        dispatch(updateWorkSpace(workSpaceName.workspaceName))
      }
    }
  };


  return (
    <>
      {/* ////////////////////////////////////      Tab Section                ///////////////////////////////////// */}

      <div className={styled.section1}>
        <div style={{ display: "flex" }}>
          <Tab></Tab>
        </div>
        <div style={{ display: "flex", alignItems: "center",gap:"3rem" }}>
        <div
            className={
              pageSelec === "add"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("add");
              setAddTask(!addTask);

            }}
          >
            <img
              src={ADD}
              alt="ADD"
              style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
            />
          </div>
          <div
            className={
              pageSelec === "search"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("search");
              setSearchBarState(!searchBarState)
            }}
          >
            <img
              src={search}
              alt="search"
              style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
            />
          </div>
          <div
            className={
              pageSelec === "undo"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("undo");
            }}
          >
            <img
              src={group1}
              alt="group1"
              style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
            />
          </div>

          <div
            className={
              pageSelec === "redo"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("redo");
            }}
          >
            <img
              src={group2}
              alt="group1"
              style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
            />
          </div>
          {/* <div
            className={
              pageSelec === "counter"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("counter");
            }}
          >
            <img
              src={group4}
              alt="group4"
              style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
            />
          </div> */}
          {/* <div
            className={
              pageSelec === "export"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("export");
            }}
          >
            {data ? (
              <img
                src={group6}
                alt="group6"
                style={{
                  width: "1.6rem",
                  height: "1.6rem",
                  color: "#7f7575",
                }}
              />
            ) : (
              <img
                src={group6}
                alt="group6"
                style={{ width: "1.6rem", height: "1.6rem", color: "#7f7575" }}
              />
            )}
          </div> */}
          <div
            className={
              pageSelec === "import"
                ? styled.section1_Right_Flex_togg
                : styled.section1_Right_Flex
            }
            onClick={() => {
              setPageSelec("import");
            }}
          >
            <img
              src={group3}
              alt="group3"
              style={{
                width: "1.8rem",
                height: "1.8rem",
                color: "#7f7575",
                cursor: "pointer",
              }}
            />
          </div>

          <div
            className={styled.userProfile}
            onClick={() => {
              setPageSelec("dot");
              setlogoutState(!logoutState);
            }}
          >
         
            <div style={{color:"#fff",fontSize:"1.5rem",cursor:"pointer"}}>{tokenObject?.userName?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
      </div>
      {/* ////////////////////////////////////      Tab Section End       ///////////////////////////////////// */}

      <div className={styled.branch_line1}>
        <div style={{ border: ".25px solid #413E3E" }}></div>
      </div>
      {logoutState ? (
        <div className={styled.dropDown} ref={dropDownRef}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ul className={styled.dropStyle}>
              <li
                onClick={() => {
                  // localStorage.removeItem("userToken");
                  // localStorage.removeItem("DomainDetail");
                  // localStorage.removeItem("overview");
                  // localStorage.removeItem("kanbanBoard");
                  localStorage.clear();
                  const persistor = persistStore(store);
  persistor.purge();
                  navigate("/");
                }}
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
  {addTask ? (
    <div className={styled.dropDown1} ref={dropDownRef1}>
      {["Task", "WorkSpace", "Project"].map((ele, ind) => {
        return (
          <div>
            {ind == 0 ? (
              ""
            ) : (
              <div
                style={{
                  width: "100%",
                  border: ".1px solid #413E3E",
                  margin: "1rem 0rem",
                }}
              ></div>
            )}
            <div
              style={{
                height: "2rem",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                cursor:"pointer"
              }}
              className={ele} 
              onClick={handleWorkSpaceClick}
            >
              {ele}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    ""
  )}
      {workSpaceValue.toggleButton ? (
        <div className={styled.editable1_sub} style={{ zIndex: 10 }}>
          <div className={styled.editable1_sub1} style={{width:"34rem",left:"42%",top:"40vh"}}>
            <div
              style={{
                display: "flex",
                marginTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.8rem",
              }}
            >
              <div>WorkSpace Name</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  // setNewMember(!newMember);
                  dispatch(toggleWorkSpace(false))
        // dispatch(toggleWorkSpace())
    
                }}
                style={{cursor:"pointer"}}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(toggleWorkSpace(false))
              AddWorkspace(workSpaceName.workspaceName)
                // if(selectedTeamID!=""){
                // AddMemberFunc();
                // }
              }}
            >
              <input
                type="text"
                defaultValue={workSpaceName.workspaceName}
                name="workspaceName"
                onChange={(e) => {
                  setWorkSpaceName({
                    ...workSpaceName,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="WorkSpace Name ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
                autoComplete="off"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
               <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}}>

               <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                  // onClick={copyToClipboard}
                >
                  {/* <button type="button" className={styled.AddStyle} onClick={copyToClipboard}>
                    Copy Link
                  </button> */}
                  {/* <input type="button" className={styled.AddStyle} placeholder="Copy Link" onClick={copyToClipboard}/> */}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle} >
                    Create
                  </button>
                </div>
               </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {searchBarState ? (
        <div className={styled.editable1_sub} style={{ zIndex: 101 }} 
        // onClick={()=>{
        //   setSearchBarState(!searchBarState)
        // }}
        ref={editable1SubRef}
        >
          <div className={styled.editable1_sub2}>
{/*            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(toggleWorkSpace(false))
                // if(selectedTeamID!=""){
                // AddMemberFunc();
                // }
              }}
            > */}
              <input
                type="text"
                defaultValue={workSpaceName.workspaceName}
                name="workspaceName"
                onChange={(e) => {
                  setWorkSpaceName({
                    ...workSpaceName,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Search ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
                autoComplete="off"
              />
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
               <div style={{display:"flex",alignItems:"center",gap:"1.5rem"}}>

               <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                  // onClick={copyToClipboard}
                >
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}>
                    Add
                  </button>
                </div>
               </div>
              </div> */}
            {/* </form> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Title;
