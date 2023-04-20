import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./ContainerStyle.module.css";
import rightarrow from "../../assets/rightarrow.svg";
import dash from "../../assets/dashboard.svg";
import save from "../../assets/save.svg";
import teamIcon1 from "../../assets/teamIcon1.svg";
import message from "../../assets/message.svg";
import star from "../../assets/star.svg";
import network from "../../assets/network.svg";
import Servericon from "../../assets/Server.svg";
import ServerW from "../../assets/ServerW.svg";
import Cube from "../../assets/Cube.svg";
import cross from "../../assets/cross.svg";
import CubeW from "../../assets/CubeW.svg";
import Node from "../../assets/Node.svg";
import NodeW from "../../assets/NodeW.svg";
import Plus_icon from "../../assets/Plus_icon.svg";
import search from "../../assets/search.svg";
import sort from "../../assets/sort.svg";
import listView from "../../assets/listView.svg";
import gridIcon from "../../assets/gridIcon.svg";
import Fake4 from "../../assets/Fake4.svg";
import picture from "../../assets/picture.svg";
import report from "../../assets/report.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "../../redux/toggButtonSlice";
import { currentProjectUpdate } from "../../redux/currentProjectSlice";
import { domainPageUpdate } from "../../redux/domainPageSlice";
import { teamNamePanel } from "../../redux/TeamPageSlice";
import {
  domainNameUpdate,
  domainTaskTogg,
  domainUpdate,
  resetDomainState,
} from "../../redux/domainToggSlice";
import { useLongPress } from "use-long-press";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { viewButton } from "../../redux/viewSlice";
import { allMemToggAction } from "../../redux/allMemberSlice";
function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    clone: true,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const longPressEvent = useLongPress(
    () => {
      // Handle click event here
    },
    { delay: 1000 }
  );

  return (
    <div
      key={props.id}
      {...listeners}
      {...attributes}
      {...longPressEvent}
      ref={setNodeRef}
      style={style}
      className="Draggable"
    >
      {props.children}
    </div>
  );
}

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    active: true, // Add active option
    over: true, // Add over option
  });

  const style = {
    // color: isOver ? "green" : undefined,
    color: isOver ? undefined : undefined,
  };

  return (
    <div className="todoList" ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function PageNav() {
  const { projectname, tabid, workspace } = useParams();
  const pageName = window.location.pathname.split("/");
  const [whiteboardId] = useState(Math.random().toString(36).substring(7));
  const whiteboardLink = `${window.location.origin}${window.location.pathname}/${whiteboardId}`;
  const teamButtonValue = useSelector((state) => state.teamButton);
  const domainSwitch = useSelector((state) => state.domainTask);
  const currentProjectValue = useSelector((state) => state.currentProject);

  const pageNameButtonValue = useSelector((state) => state.PageNameB);
  let domainPagerValue = useSelector((state) => state.domainPageredux);
  let viewStateValue = useSelector((state) => state.ViewNameB);
  
  const [CustomizeState, setCustomizeState] = useState(false);

  const [newMember, setNewMember] = useState(false);
  const [newTeam, setNewTeam] = useState(false);
  const [newTeamData, setNewTeamData] = useState({
    teamName: "",
  });
  const [newMemberData, setNewMemberData] = useState({
    memberName: "",
    email: "",
    profile: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const OusideTeam = useRef();
  const [teamCardTogg, setTeamCardTogg] = useState(false);
  const [pageSelec, setPageSelec] = useState("project");
  const [totalTeam, setTotalTeam] = useState([]);
  // const [selectedTeam, setSelectedTeam] = useState([]);
  // const [selectedTeamID, setSelectedTeamID] = useState("");
  const [allTeamMem, setAllTeamMem] = useState([]);

  const [workspacePage, setWorkSpacePage] = useState([
    "Overview",
    "Domains",
    "RoadMap",
    "Spaces",
  ]);
  const [selectedPro, setSelectedPro] = useState(null);

  const [selectedOption, setSelectedOption] = useState(workspacePage[0]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (event.target.value != "Domains")
      navigate(
        `/home/${projectname}/${tabid}/${workspace}/${event.target.value}`
      );
    else
      navigate(
        `/home/${projectname}/${tabid}/${workspace}/${event.target.value}/all/list`
      );
  };
  const handleTabChange = (event) => {
    if (event) {
      setSelectedPro(event.target.value);

      const Url = window.location.pathname.split("/");
      const updatedUrl = [...Url];
      updatedUrl.splice(2, 1, event.target.value);
      const newUrl = updatedUrl.join("/");
      navigate(newUrl);
    }
  };

  const getPageContent = () => {
    if (pageName[4] === "workspace") {
      return (
        <li>
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              defaultValue={selectedOption}
              onChange={handleOptionChange}
              className={styled.selectTagStyle1}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#fff",
              }}
              onClick={() => {
                if (domainSwitch.value == false) dispatch(domainTaskTogg());
                if (domainSwitch.domainUpdateValue == true)
                  dispatch(domainUpdate());
                dispatch(domainNameUpdate({ name: "", domainId: "" }));
              }}
            >
              {workspacePage.map((ele, ind) => (
                <option
                  key={ind}
                  defaultValue={ele}
                  selected={ele == pageName[5]}
                >
                  {ele}
                </option>
              ))}
            </select>
          </div>
        </li>
      );
    } else {
      return null;
    }
  };


//  when team Selected /  After Team Added

  const AddProject = async () => {
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

      data = await res.json();
      if (data.status === 422) {
        console.log("Error PageNav", data);
      } else {
        let team ;
        //  All members
        setAllTeamMem(data.updatedUser.AllMember);
        team=
          data.updatedUser.projects &&
          data.updatedUser.projects.find((ele, ind) => {
            if(ele.projectName===projectname)
              return ele;
          });
        if (selectedPro === null) {
          setSelectedPro(data.updatedUser.projects[0].projectName);
        }

        if (team?.team.length >= 1) {
          setTotalTeam(team.team);
        }
      }
  };

///   Not Clear...

  useEffect(() => {
    if (teamButtonValue == true && pageName[5] !== "teamAdd")
      dispatch(toggleButton(false));
  }, [window.location.pathname,pageName[2]]);

/////////////////////////////////// Add New Mmember in All Section Function
  function AddMemberFunc() {
    const AddMember = async () => {
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));
      const formData = new FormData();
      formData.append("image", newMemberData.profile);
      formData.append("memberName", newMemberData.memberName);
      formData.append("memberEmail", newMemberData.email);
      formData.append("token", tokenObject.tokenGen);
      formData.append("projectName", pageName[2]);
      formData.append("link", whiteboardLink);

     let res= await fetch(`http://localhost:8000/member/upload`, {
        method: "POST",
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // },
        body: formData,
      });
   let data = await res.json();
     if(data.status == 422){
      console.log("New Member not Added in all Section")
     }
     else{
     dispatch(allMemToggAction())
     }

    };

    function EmailValid() {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (emailPattern.test(newMemberData.email)) {
        console.log(" Email correct");
        if (newMemberData.memberName !== "" && newMemberData.profile !== "") {
          AddMember();
          setNewMember(!newMember);
        }
      } else {
        console.log(" Email Not correct");
      }
    }
    EmailValid();
  }

///////////////////////////////////    Create New Team in All Team Section Function

  const AddTeamFunc = async () => {
    let res, data;

    const tokenObject = JSON.parse(localStorage.getItem("userToken"));
    res = await fetch(`http://localhost:8000/create/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: newTeamData,
        extraData: {
          projectName: pageName[2],
          token: tokenObject.tokenGen,
        },
      }),
    });
    data = await res.json();
  };



  //   When new Member added
  useEffect(() => {
    AddProject();
  }, [newMember,allTeamMem]);
  


  const [selectTeam, setSelectTeam] = useState("");

  const [elements, setElements] = useState([]);
  const [elements1, setElements1] = useState([]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over) {
      let droppableData = [...elements];
      let exsist = droppableData.findIndex((ele, ind) => {
        if (ele._id == active.id._id) return ele;
      });
      if (exsist <= -1) setElements([...elements, active.id]);
    }
  }
  function handleDragEnd1(event) {
    const { active, over } = event;
    if(selectTeam){

      if (over) {
      //   if(elements1.length==0){
      //  let extractObject= allTeamMem.find((ele,ind)=>{
      //       if(ele._id==active.id)
      //       return ele;
      //     })
      //   setElements1([extractObject, ...elements1])
  
  
      //   }
  
      //   else{
          let extractObject= allTeamMem.find((ele,ind)=>{
            if(ele._id==active.id)
            return ele;
          })
          let droppableData = [...elements1];
          let exsist = droppableData.findIndex((ele, ind) => {
            if (ele._id == extractObject._id) return ele;
          });
          if (exsist <= -1) {
            setElements1([extractObject, ...elements1])
          };
        }
  
      // }
    }
  }

  const draggableMarkup = (id) => (
    <Draggable key={id} id={id}>
      <div
        id={id._id}
        key={id._id}
        style={{
          width: "6rem",
          height: "6rem",
          borderRadius: ".7rem",
          border: "1px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          //   if(totalTeam.length<=1)
          //  { setNewTeam(!newTeam)
          //   setTeamCardTogg(!teamCardTogg);}
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
            border: "1px solid #7f7575",
            borderRadius: "2rem",
          }}
        ></div>

        {/* {id.teamName} */}
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {id.teamName ? id.teamName : <span>Design Team</span>}
      </div>
    </Draggable>
  );
  const draggableMarkup1 = (id, elementImage) => (
    <Draggable key={id._id} id={id._id}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
        key={id._id}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "4rem",
              height: "4rem",
              borderRadius: "2rem",
              border: "1px solid",
              marginRight: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => {
              e.stopPropagation();
              let memData = {
                id: id,
                teamState: false,
              };

              setTeamCardTogg(!teamCardTogg);
              navigate(`/home/${projectname}/${tabid}/${workspace}/teamAdd`, {
                state: memData,
              });
              dispatch(toggleButton(true));
            }}
          >
            <img
              src={elementImage}
              alt="sdasasda"
              style={{ width: "2.5rem", height: "2.5rem" }}
            />
          </div>
          <div>
            <div style={{ display: "flex" }}>
              <div className={styled.allMemberName}>{id.memberName}</div>
              <div>
                <img src={message} alt="message" />
              </div>
            </div>
            <div style={{ fontSize: "1.4rem" }}>Marketing</div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <div style={{ fontSize: "2rem" }}> ...</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: ".5rem", color: "green" }}>.</div>
            <div>Online</div>
          </div>
        </div>
      </div>
    </Draggable>
  );

///////////////  When selected team are Targeted

  useEffect(() => {
    if (selectTeam.teamName != "") {
      async function fetchData() {
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

        data = await res.json();
        if (data.status === 422) {
          console.log("Project Name Not Updated", data);
        } else {
          setElements1(
            data.updatedUser.projects.find((ele,ind)=>{
              if(ele.projectName===projectname)
              return ele;
            })?.team.find((ele) => {
              if (ele.teamName == selectTeam.teamName) return ele;
            })?.members
          );
          // }
        }
      }
      fetchData();
    }
  }, [selectTeam]);




/////   Realted to All Teams
  useEffect(() => {
    if (selectTeam !== "") {
      async function postMember() {
        let res, data;
        const tokenObject = JSON.parse(localStorage.getItem("userToken"));

        if (tokenObject.tokenStatus === "manual") {
          res = await fetch(`http://localhost:8000/select/member`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: tokenObject.tokenStatus,
              requireData: {
                projectName: pageName[2],
                teamName: selectTeam,
                token: tokenObject.tokenGen,
                members: elements1,
              },
            }),
          });
        }

        data = await res.json();
        if (data.status === 422) {
          console.log("Project Name Not Updated", data);
        } else {
        }
      }
      postMember();
      console.log("Ytytsyyqeq",selectTeam,elements1)
    }
  }, [elements1]);

useEffect(()=>{
  setElements([])
  setElements1([])
},[projectname])

//  navigate Workspace Pages By select Tag [No fetch Call]

useEffect(() => {
  setSelectedOption(pageName[5]);
}, [pageName[5]]);

////////////////  Copy Clipboard  ===  Link


  function copyToClipboard() {
    const input = document.createElement("input");
    input.value = whiteboardLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }


  return (
    <>
   
      <div style={{ width: "100%" }}>
        <div className={styled.connectSearch}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.8rem",
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (pageNameButtonValue === "Workspace")
                  navigate(
                    `/home/${projectname}/${tabid}/${workspace}/Overview`
                  );
                else {
                  // navigate(`/home/${projectname}/${pageName[3]}/`);
                }
              }}
            >
              {pageNameButtonValue &&
                pageNameButtonValue.charAt(0).toUpperCase() + pageNameButtonValue.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}
            </div>
            &nbsp;&nbsp;
            <div>
              <img src={rightarrow} style={{ width: "1rem", height: "1rem" }} />
            </div>
            
           {pageName[4]==="mytask"? <>&nbsp;&nbsp;<div>General</div>&nbsp;&nbsp;<div>
              <img src={rightarrow} style={{ width: "1rem", height: "1rem" }} />
            </div> </>:""}
            {pageNameButtonValue === "Workspace" ? <>&nbsp;&nbsp;<div style={{cursor:"pointer"}} onClick={()=>{
                dispatch(resetDomainState())
               navigate(`/home/${projectname}/${tabid}/${workspace}/Domains/${pageName[6]}/list`);

               
            }}>{pageName[5]}</div>&nbsp;&nbsp;<div>
              <img src={rightarrow} style={{ width: "1rem", height: "1rem" }} />
            </div> </> : ""}
            
            {/* <div>
              <img src={rightarrow} style={{ width: "1rem", height: "1rem" }} />
            </div> */}
            {/* &nbsp;&nbsp; */}
            {/* <div>{pageName[6]}</div> */}
            {/* &nbsp;&nbsp; */}
            {/* <ul style={{ fontSize: "1.8rem",color:"#fff",cursor:"pointer" }}></ul> */}
            {/* <select
              onChange={handleTabChange}
              className={styled.selectTagStyle}
              defaultValue={currentProjectValue}
            >
              {projectName.map((ele, ind) => {
                return (
                  <option
                    key={ind}
                    defaultValue={ele}
                    style={{ color: "red" }}
                    selected={ele == currentProjectValue}
                  >
                    {ele.charAt(0).toUpperCase() + ele.slice(1)}
                  </option>
                );
              })}
            </select> */}
          
            {/* <div>
              <img src={rightarrow} style={{ width: "1rem", height: "1rem" }} />
            </div> */}
            {pageName[4] === "workspace" ? (
              <ul
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  listStyle: "none",
                }}
              >
                {getPageContent()}
              </ul>
            ) : (
              ""
            )}
            {pageName[4] === "workspace" ? (
              <div>
                <i className="fa-solid fa-caret-down"></i>
              </div>
            ) : (
              ""
            )}
            <div
              style={{ color: "#fff", cursor: "pointer", marginLeft: "1rem" }}
            >
              {pageName[5] === "teamAdd" && <span>New team</span>}
            </div>
            {pageName[5] === "teamAdd" ? <span>&nbsp;&nbsp;</span> : ""}
            <div>
              {pageName[5] === "Domains" && domainSwitch.value === false ? (
                <span style={{ color: "#fff" }}>
                  {domainSwitch.name}
                  <span>&nbsp;&nbsp;</span>
                </span>
              ) : (
                ""
              )}
            </div>
            <div>
              <img
                src={star}
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                  marginRight: "1rem",
                }}
              />
            </div>
            <div>
              <img
                src={network}
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <div
              className={styled.pageNaveButton}
              style={{ marginRight: "2rem"}}
            >
              <img
                src={searchicon}
                alt="search"
                style={{ width: "1.4rem", height: "1.4rem" }}
              />
              <input type="text" 
              value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
              style={{backgroundColor:"transparent",width:"10rem"}} placeholder="Search"/>
            </div> */}
  
              {pageNameButtonValue ==="myTask" || pageNameButtonValue ==="Workspace"?  <div onClick={() => {}} className={styled.listViewButton}>
                  <div
                    className={
                      viewStateValue === "list"
                        ? styled.selectlistViewButton
                        : ""
                    }
                    style={{
                      marginLeft: domainPagerValue === "list" ? "0rem" : "1rem",
                    }}
                    onClick={() => {
                      // dispatch(domainPageUpdate("list"));
                      dispatch(viewButton("list"))
                    }}
                  >
                    <img src={listView} alt="asaasdas" />
                  </div>
                  <div
                    className={
                      viewStateValue === "card"
                        ? styled.selectlistViewButton
                        : "card"
                    }
                    onClick={() => {
                      // dispatch(domainPageUpdate("card"));
                      dispatch(viewButton("card"))

                    }}
                    style={{ margin: "0rem 1rem" }}
                  >
                    <img src={gridIcon} alt="asaasdas" />
                  </div>
                  <div
                    className={
                      viewStateValue === "calender"
                        ? styled.selectlistViewButton
                        : "calender"
                    }
                    onClick={() => {
                      // dispatch(domainPageUpdate("calender"));
                      dispatch(viewButton("calender"))

                    }}
                    style={{
                      marginRight:
                      viewStateValue === "calender" ? "0rem" : "1rem",
                    }}
                  >
                    <img src={report} alt="asaasdas" />
                  </div>
                </div>:""}

            {pageNameButtonValue === "Workspace" ? (
              <div
                onClick={() => {
                  // navigate(`${customURL}/teamAdd`);

                  setTeamCardTogg(!teamCardTogg);
                }}
                style={{ display: "flex", marginRight: "2rem" }}
              >
                {[1, 2, 3, 4].map((ele, ind) => {
                  return (
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "1rem",
                        border: ".5px dashed",
                        marginLeft: ".3rem",
                        cursor: "pointer",
                      }}
                      key={ind}
                    ></div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            <button
              className={styled.pageNaveButton}
              style={{ marginRight: "2rem" }}
            >
              <img
                src={save}
                alt="dashboard"
                style={{
                  width: "1.4rem",
                  height: "1.4rem",
                }}
              />
              <span style={{ fontSize: "1.4rem", marginLeft: ".5rem" }}>
                Save
              </span>
            </button>
            <button
              className={styled.pageNaveButton}
              onClick={() => {
                setCustomizeState(!CustomizeState);
              }}
            >
              <img
                src={dash}
                alt="dashboard"
                style={{
                  width: "1.3rem",
                  height: "1.3rem",
                }}
              />
              <span style={{ fontSize: "1.2rem", marginLeft: ".5rem" }}>
                Customize
              </span>
            </button>
          </div>
        </div>
        <div className={styled.branch_line1}>
          <div style={{ border: ".25px solid #413E3E" }}></div>
        </div>
      </div>
      {/* /////////////////////////////////   Tram panel  */}
      {teamCardTogg ? (
        <div className={styled.TeamPanel} ref={OusideTeam}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "3.5rem",
            }}
          >
            <div style={{ fontSize: "1rem" }}>
              Select your team & individual members
            </div>
            <div
              onClick={() => {
                setTeamCardTogg(!teamCardTogg);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                maxHeight: "100%",
                paddingTop: "1rem",
                width: "auto",
              }}
            >
              <img src={teamIcon1} alt="dfbshd" />
            </div>
          </div>
          <div>
            <DndContext onDragEnd={handleDragEnd}>
              <div style={{ minHeight: "10rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "1.4rem", margin: "1rem 0rem" }}>
                    Selected Teams
                  </div>
                  <div
                    style={{ paddingTop: "1rem" }}
                    onClick={() => {
                      var newArr = [...elements];
                      var tty = newArr.filter((ele, ind) => {
                        if (ele._id != selectTeam._id) {
                          return ele;
                        }
                      });
                      setElements(tty);
                    }}
                  >
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                  </div>
                </div>
                <Droppable key={"abcdef"} id={"abcdef"}>
                  <div
                    className={styled.AllTeamContainer}
                    style={{ marginBottom: "0rem" }}
                  >
                    {elements.length === 0 ? (
                      <div className="app__infoBox app__infoBox--inactive">
                        <div style={{ fontSize: "1rem" }}>
                          Team Not Selected
                        </div>
                      </div>
                    ) : (
                      <div className={styled.AllTeamContainer}>
                        <div className={styled.AllTeamSubContainer1}>
                          {elements.map((id, ind) => {
                            const isSelected = id === selectTeam; // check if this element is selected
                            return (
                              <div
                                style={{ marginRight: "3rem" }}
                                key={ind}
                                onDoubleClick={() => {
                                  let teamData = {
                                    id: id,
                                    teamState: true,
                                  };

                                  setTeamCardTogg(!teamCardTogg);
                                  navigate(
                                    `/home/${projectname}/${tabid}/${workspace}/teamAdd`,
                                    { state: teamData }
                                  );
                                  dispatch(toggleButton(true));
                                }}
                              >
                                <div
                                  style={{
                                    width: "6rem",
                                    height: "6rem",
                                    borderRadius: ".7rem",
                                    border: "1px solid",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isSelected
                                      ? ""
                                      : "transparent", // set background color based on selection
                                  }}
                                  onClick={() => {
                                    setSelectTeam(id);
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "4rem",
                                      height: "4rem",
                                      border: "1px solid #7f7575",
                                      borderRadius: "2rem",
                                    }}
                                  ></div>
                                  {/* <span>{id.teamName}</span> */}
                                </div>
                                <div
                                  style={{
                                    marginTop: "1rem",
                                    fontSize: "1.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    color: isSelected ? "white" : "", // set text color based on selection
                                  }}
                                >
                                  {id.teamName}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Droppable>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                    All Teams
                  </div>
                  <div>
                    {totalTeam.length >= 1 ? (
                      <div
                        style={{
                          width: "auto",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (totalTeam.length >= 1) {
                            setNewTeam(!newTeam);
                            // setTeamCardTogg(!teamCardTogg);
                          }
                        }}
                      >
                        <img
                          src={Plus_icon}
                          alt="Plus_icon"
                          style={{ width: "2rem", height: "2rem" }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styled.AllTeamContainer}>
                  <div className={styled.AllTeamSubContainer}>
                    {totalTeam.length == 0 ? (
                      <div style={{ marginRight: "3rem" }}>
                        <div
                          style={{
                            width: "6rem",
                            height: "6rem",
                            borderRadius: ".7rem",
                            border: "1px solid",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            // setNewMember(!newMember);
                            if (totalTeam.length <= 1) {
                              setNewTeam(!newTeam);
                              // setTeamCardTogg(!teamCardTogg);
                            }
                          }}
                        >
                          {/* <div className={styled.teamCircle}></div> */}
                          <div
                            className={styled.teamCircle}
                            style={{ fontSize: "3rem" }}
                          >
                            {totalTeam.length == 0 ? <span>+</span> : ""}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "1rem",
                            fontSize: ".8rem",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <span>Design Team</span>
                        </div>
                      </div>
                    ) : (
                      totalTeam &&
                      totalTeam.map((ele, ind) => {
                        return (
                          <div
                            style={{ marginRight: "3rem" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // setSelectedTeamID(ele._id)
                            }}
                            key={ind}
                          >
                            {draggableMarkup(ele)}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </DndContext>
            {/* ///////////////////   Member Section   //////////////// */}
            <DndContext onDragEnd={handleDragEnd1}>
              <div
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Added members</div>
              </div>
              <Droppable key={"ghijkl"} id={"ghijkl"}>
                <div className={styled.selectedMember}>
                  {elements1 && elements1.map((ele, ind) => {
                    let elementImage = `http://localhost:8000/${ele.image}`;

                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                        }}
                        key={ind}
                      >
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "2rem",
                              border: "1px solid",
                              marginRight: "1.5rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={elementImage}
                              alt="sdasasda"
                              style={{ width: "2.5rem", height: "2.5rem" }}
                            />
                          </div>
                          <div>
                            <div style={{ display: "flex" }}>
                              <div
                                style={{
                                  fontSize: "1.6rem",
                                  marginRight: "1.5rem",
                                }}
                              >
                                {ele.memberName}
                              </div>
                              <div>
                                <img src={message} alt="message" />
                              </div>
                            </div>
                            <div style={{ fontSize: "1.4rem" }}>Marketing</div>
                          </div>
                        </div>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div></div>
                            <div style={{ fontSize: "2rem" }}> ...</div>
                          </div>
                          <div style={{ display: "flex" }}>
                            <div
                              style={{ marginRight: ".5rem", color: "green" }}
                            >
                              .
                            </div>
                            <div>Online</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Droppable>

              {/* <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "4rem",
                      height: "4rem",
                      borderRadius: "2rem",
                      border: "1px solid",
                      marginRight: "1.5rem",
                    }}
                  >
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          marginRight: "1.5rem",
                        }}
                      >
                        Ritik Sharma
                      </div>
                      <div>
                        <img src={message} alt="message" />
                      </div>
                    </div>
                    <div style={{ fontSize: "1.4rem" }}>Marketing</div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div></div>
                    <div style={{ fontSize: "2rem" }}> ...</div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: ".5rem", color: "green" }}>
                      .
                    </div>
                    <div>Online</div>
                  </div>
                </div>
              </div>
            </div> */}

              {/* /////////////////////////////////  All member    /////////////// */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                    All members
                  </div>
                  <div
                    onClick={() => {
                      setNewMember(!newMember);
                    }}
                  >
                    <img src={Plus_icon} alt="Plus_icon" />
                  </div>
                </div>
                <div className={styled.allMemberCont}>
                  <div>
                    {allTeamMem && allTeamMem.map((ele, ind) => {
                      let elementImage = `http://localhost:8000/${ele.image}`;
                      return draggableMarkup1(ele, elementImage);
                    })}
                  </div>
                </div>
              </div>
            </DndContext>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* /////////////////////////////////   Tram panel  */}
      {CustomizeState ? (
        <div className={styled.TeamPanel1} ref={OusideTeam}>
          <div style={{ width: "8rem", marginTop: "2rem" }}>
            <div
              style={{
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "#fff",
                  borderRadius: ".5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={Fake4} alt="dfdfd" />
              </div>
              <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
                Sections
              </div>
            </div>
            <div
              style={{
                marginBottom: "2rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "4rem",
                  height: "4rem",
                  backgroundColor: "#fff",
                  borderRadius: ".5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={Fake4} alt="dfdfd" />
              </div>
              <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
                Sections
              </div>
            </div>
          </div>
          <div className={styled.TeamPanelSub}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // height: "3.5rem",
              }}
            >
              <div style={{ fontSize: "1.8rem", color: "#fff" }}>Customize</div>
              <div
                onClick={() => {
                  setCustomizeState(!CustomizeState);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  maxHeight: "100%",
                  width: "auto",
                  cursor: "pointer",
                }}
              >
                <img src={teamIcon1} alt="dfbshd" />
              </div>
            </div>

            <div style={{ margin: "3rem 0rem", fontSize: "1.4rem" }}>
              Sections
            </div>
            <div styel={{ marginTop: "3rem" }}>
              {["Workspace name", "Assignee name", "Charts"].map((ele, ind) => {
                return (
                  <div className={styled.cutomizeSections}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          border: "1px solid #7f7575",
                          borderRadius: "1.5rem",
                        }}
                      ></div>
                      <div style={{ marginLeft: "1rem", fontSize: "1.4rem" }}>
                        {ele}
                      </div>
                    </div>
                    <div style={{ fontSize: "2rem", marginRight: ".5rem" }}>
                      +
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: "3rem",
                marginBottom: "3rem",
                fontSize: "1.4rem",
              }}
            >
              Archived
            </div>
            <div styel={{ marginTop: "3rem" }}>
              {["Workspace name", "Assignee name", "Charts"].map((ele, ind) => {
                return (
                  <div className={styled.cutomizeSections}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          border: "1px solid #7f7575",
                          borderRadius: "1.5rem",
                        }}
                      ></div>
                      <div style={{ marginLeft: "1rem", fontSize: "1.4rem" }}>
                        {ele}
                      </div>
                    </div>
                    <div style={{ fontSize: "2rem", marginRight: ".5rem" }}>
                      +
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ///////////////////////////   Mesh Button */}
      {/* <div
        className={styled.meshButton}
        onClick={() => {
        }}
      ></div> */}

      {/* /////////////////////////////////////////////////// */}
      {/* {globealButtonValue ? (
        <div className={styled.meshBarCard}>
          <div className={styled.meshBarCard1}>
            <div
              className={styled.meshBaricon}
              style={{
                border: pageSelec === "project" ? "0.5px solid #7F7575" : "",
              }}
              onClick={() => {
                setPageSelec("project");
              }}
            >
              <img
                src={pageSelec === "project" ? ServerW : Servericon}
                alt="Server"
              />
              <div
                style={{
                  fontSize: "1.6rem",
                  color: pageSelec === "project" ? "#fff" : "#7f7575",
                }}
                onDoubleClick={() => {
                  setPageSelec("domain");
                }}
              >
                Projects
              </div>
            </div>
            <div
              className={styled.meshBaricon}
              style={{
                border: pageSelec === "domain" ? "0.5px solid #7F7575" : "",
              }}
              onClick={() => {
                setPageSelec("domain");
              }}
            >
              <img src={pageSelec === "domain" ? CubeW : Cube} alt="Cube" />
              <div
                style={{
                  fontSize: "1.6rem",
                  color: pageSelec === "domain" ? "#fff" : "#7f7575",
                }}
              >
                Domain
              </div>
            </div>
            <div
              className={styled.meshBaricon}
              style={{
                border: pageSelec === "team" ? "0.5px solid #7F7575" : "",
              }}
              onClick={() => {
                setPageSelec("team");
              }}
            >
              <img src={pageSelec === "team" ? NodeW : Node} alt="Node" />
              <div
                style={{
                  fontSize: "1.6rem",
                  color: pageSelec === "team" ? "#fff" : "#7f7575",
                }}
              >
                Teams
              </div>
            </div>
            <div
              className={styled.meshBaricon}
              style={{
                border: pageSelec === "setting" ? "0.5px solid #7F7575" : "",
              }}
              onClick={() => {
                setPageSelec("setting");
              }}
            >
              <img src={pageSelec === "setting" ? NodeW : Node} alt="Node" />

              <div
                style={{
                  fontSize: "1.6rem",
                  color: pageSelec === "setting" ? "#fff" : "#7f7575",
                }}
              >
                Settings
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "3rem",
            }}
          >
            <div className={styled.meshBarsearch}>
              <img
                src={search}
                style={{
                  display: "inline-block",
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
              <input type="search" placeholder="Search" />
            </div>
            <div style={{ display: "flex" }}>
              <button
                className={styled.meshBarbutton}
                style={{ marginRight: "3rem" }}
              >
                <img src={sort} alt="sort" />
                Sort
              </button>
              <button className={styled.meshBarbutton}>
                <img src={Plus_icon} alt="Plus_icon" />
                Add
              </button>
            </div>
          </div>

          {globealButtonValue ? (
            <div style={{ display: "flex", margin: "3rem" }}>
              {projectName &&
                projectName.map((ele, ind) => {
                  return (
                    <div
                      style={{
                        width: "8.1rem",
                        height: "10.9rem",
                        marginRight: "5rem",
                        cursor: "pointer",
                      }}
                      key={ind}
                      id={ind}
                      onDoubleClick={() => {
                        setPageSelec("domain");
                      }}
                    >
                      <div className={styled.card_style}>
                        <img
                          src={picture}
                          alt="picture"
                          style={{ width: "6rem", height: "6rem" }}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "1.8rem",
                          marginTop: "1rem",
                          fontSize: "1.2rem",
                          color: "#7f7575",
                          display: "flex",
                          justifyContent: "center",
                        }}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "3rem",
              marginTop: "10.9rem",
              color: "#7f7575",
            }}
          >
            <div></div>
            <div style={{ display: "flex" }}>
              <button
                className={styled.meshBarbutton}
                style={{ marginRight: "3rem" }}
                onClick={() => {
                  // setMeshTogg(false)
                }}
              >
                Close
              </button>
              <button className={styled.meshBarbutton}>Open</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
      {newMember ? (
        <div className={styled.editable1_sub} style={{ zIndex: 101 }}>
          <div className={styled.editable1_sub1}>
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
              <div>Invite</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setNewMember(!newMember);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // if(selectedTeamID!=""){
                AddMemberFunc();
                // }
              }}
            >
              <input
                type="text"
                defaultValue={newMember.taskName}
                name="memberName"
                onChange={(e) => {
                  setNewMemberData({
                    ...newMemberData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Member Name ..."
                style={{ resize: "none", padding: "1rem", }}
                autoFocus
              />
              <input
                type="text"
                defaultValue={newMember.taskName}
                name="email"
                onChange={(e) => {
                  setNewMemberData({
                    ...newMemberData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Member Email ..."
                style={{ resize: "none", padding: "1rem" }}
              />
              <input
                type="file"
                defaultValue={newMember.description}
                name="profile"
                onChange={(e) => {
                  setNewMemberData({
                    ...newMemberData,
                    [e.target.name]: e.target.files[0],
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Add Description  ..."
                style={{ padding: "1rem" }}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                    onClick={copyToClipboard}
                  >
                    <button
                      type="button"
                      className={styled.AddStyle}
                      onClick={copyToClipboard}
                    >
                      Copy Link
                    </button>
                    {/* <input type="button" className={styled.AddStyle} placeholder="Copy Link" onClick={copyToClipboard}/> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <button
                      type="submit"
                      className={styled.AddStyle}
                      onClick={copyToClipboard}
                    >
                      Share
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
      {newTeam ? (
        <div className={styled.editable1_sub} style={{ zIndex: 101 }}>
          <div className={styled.editable1_sub1}>
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
              <div>New Team</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setNewTeam(!newTeam);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddTeamFunc();
                AddProject();
                setNewTeam(!newTeam);
              }}
            >
              <input
                type="text"
                defaultValue={newMember.taskName}
                name="teamName"
                onChange={(e) => {
                  setNewTeamData({
                    ...newTeamData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Team Name ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
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
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PageNav;
