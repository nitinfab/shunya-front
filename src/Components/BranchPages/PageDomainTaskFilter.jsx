import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "./ContainerStyle.module.css";
import viewicon from "../../assets/view.svg";
import sorticon from "../../assets/sort.svg";
import done from "../../assets/done.svg";
import pen2 from "../../assets/pen2.svg";
import cross from "../../assets/cross.svg";
import sort from "../../assets/sort.svg";
import Maximize from "../../assets/Maximize.svg";
import High from "../../assets/highPrio.svg";
import To_do from "../../assets/todoS.svg";
import In_Progress from "../../assets/progS.svg";
import Done from "../../assets/doneS.svg";
import Backlog from "../../assets/backS.svg";
import label from "../../assets/label.svg";
import assignee from "../../assets/user.svg";

import Urgent from "../../assets/urgentPrio.svg";
import Mid from "../../assets/midPrio.svg";
import Low from "../../assets/lowPrio.svg";
import link from "../../assets/link.svg";
import bin from "../../assets/bin.svg";
import lock from "../../assets/lock.svg";
import loudspeaker from "../../assets/loudspeaker.svg";
import more from "../../assets/more.svg";
import send from "../../assets/send.svg";
import teamIcon1 from "../../assets/teamIcon1.svg";


import Plus_icon from "../../assets/Plus_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { TaskInfoStateTogg } from "../../redux/TaskInfoSlice";
import { myTaskDataAction } from "../../redux/myTaskSlice";
import { workspaceDataAction } from "../../redux/workspaceDataSlice";


function PageDomainTaskFilter() {
  const { projectname, tabid, taskName,workspace } = useParams();
  const getImageForOption = (option) => {
    switch (option) {
      case "To_do":
        return To_do;
      case "Backlog":
        return Backlog;
      case "In_Progress":
        return In_Progress;
      case "Done":
        return Done;
      default:
        return To_do;
    }
  };
  const getImageForOption1 = (option) => {
    switch (option) {
      case "Low":
        return Low;
      case "Mid":
        return Mid;
      case "High":
        return High;
      case "Urgent":
        return Urgent;
      default:
        return Low;
    }
  };
  const dispatch = useDispatch();
  const pageName = window.location.pathname.split("/");
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);

  const domainSwitch = useSelector((state) => state.domainTask);
  const domainPagerValue = useSelector((state) => state.domainPageredux);
  const TaskInfoValue = useSelector((state) => state.TaskInfoStateB);
  const [maximizeState, setMaximizeState] = useState(false);

  const [subtaskStatus,setSubtaskStatus]=useState({
    priority:{ value: "Low" ,image: getImageForOption("Low")},
    status:{ value: "To do" ,image: getImageForOption("To do")},
  });
  const [newTaskData, setNewTaskData] = useState({
    taskName: "",
    description: "",
  });
  const [newTask, setNewTask] = useState(false);

  // const[tickets,setTickets]=useState(JSON.parse(localStorage.getItem("DomainDetail"))[0]?.cards?.find((ele) => ele.id==domainSwitch.domainId)?.tasks.map((ele)=>ele) || [{title:"All"},{title:"Assigned"},{title:"Created"},{title:"Completed"}])
  const navigate = useNavigate();
  const [ticketPage, setTicketPage] = useState([
    { title: "Overview" },
    { title: "Sub tasks" },
    { title: "Issues" },
    { title: "Files" },
    { title: "Review" },
  ]);
  ////////////////////////////////////// 3
  const [selectedValues3, setSelectedValues3] = useState([]);

    //////////////////////////////////////////// 4
    const [selectedValues4, setSelectedValues4] = useState([]);
    useEffect(() => {
        setSelectedValues4([{ image: getImageForOption1(TaskInfoValue.taskInfoTask?.priority), value: TaskInfoValue.taskInfoTask?.priority }]);
        setSelectedValues3([{ image: getImageForOption(TaskInfoValue.taskInfoTask?.status), value: TaskInfoValue.taskInfoTask?.status }]);
    }, []);
   
   ////////////////////////   New subTask
  const [domainDetail3, setDomainDetail3] = useState(
    myTaskStateValue
    .find(
        (ele) =>
          ele.title ==
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
      )?.cards.find((ele,ind)=>{
          if(ele._id==TaskInfoValue.taskInfoTask._id)
          return ele;
      })?.tasks[0]?.subtask.map((ele) => ele) || []
  );
   const [selectedValues1, setSelectedValues1] = useState([]);
   const [selectedDropdownIndex1, setSelectedDropdownIndex1] = useState(null);
   const [dropdownState1, setDropdownState1] = useState([]);
   const [toggstate1, settoggstate1] = useState(false);
   useEffect(() => {
     setSelectedValues1([{ image: To_do, value: "To_do" }]);
     setDropdownState1(domainDetail3.map(() => false));
   }, [domainDetail3]);
 

   const handleOptionSelect1 = (option, index) => {
    setSelectedValues1((prevState) => {
        setSubtaskStatus({...subtaskStatus,
        status:{ value: option }
        })
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption(option) };
      return newValues;
    });
    setDropdownState1((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate1(false);
  };



  ////////////////////////////////////////////   4

  const [selectedValues2, setSelectedValues2] = useState([]);
  const [selectedDropdownIndex2, setSelectedDropdownIndex2] = useState(null);
  const [dropdownState2, setDropdownState2] = useState([]);
  const [toggstate2, settoggstate2] = useState(false);

  useEffect(() => {
    setSelectedValues2([{ image: Low, value: "Low" }]);
    setDropdownState2(domainDetail3.map(() => false));
  }, [domainDetail3]);

  const handleOptionSelect2 = (option, index) => {
    setSelectedValues2((prevState) => {
        setSubtaskStatus({...subtaskStatus,
            priority:{ value: option }
            })
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption1(option) };
      return newValues;
    });
    setDropdownState2((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate2(false);
  };
 
  
async function AddSubtask(userData){
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    let res = await fetch(`http://localhost:8000/user/workspace/task/subtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenData: {
            token: tokenObject.tokenGen,
            project: pageName[2],
            workspaceName: pageName[4],
            kanbanData: {
              data: userData,
              domainName: domainSwitch.name,
              ticketName1:
                pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1),
              ticketName2:
                pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1),
                taskNameId:  TaskInfoValue.taskInfoTask._id,
            },
          },
        }),
      });
     let data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      }
      
      else {
        // console.log("HGggg3423423HGHgg333434",data.updatedUser)
        dispatch(workspaceDataAction(data.updatedUser.projects.find((ele,ind)=>{
            if(ele.projectName==projectname)
            return ele
          }).workSpace.find((ele,ind)=>{
            if(ele.name===workspace)
            return ele;
          }).data))
        setNewTask(false);

      }


}



  return (
    <>
      <div className={styled.section3} style={{position:"relative"}}>
        <div style={{ display: "flex" }}>
          <div className={styled.section3_Left_container}>
            {ticketPage.map((ele, ind) => {
              return (
                <div className={styled.section3_Left}>
             
                  <Link
                    to={
                      ele.title === "Sub tasks"
                        ? `/home/${projectname}/${tabid}/${workspace}/Domains/${pageName[6]}/list/${pageName[8]}/${pageName[9]}/Sub`
                        : `/home/${projectname}/${tabid}/${workspace}/Domains/${pageName[6]}/list/${pageName[8]}/${pageName[9]}/${ele.title}`
                    }
                    className={
                      pageName[10] === "Sub"
                        ? "Sub tasks" === `${ele.title}`
                          ? styled.link_togg
                          : styled.link
                        : pageName[10] === `${ele.title}`
                        ? styled.link_togg
                        : styled.link
                    }
                    onClick={() => {}}
                  >
                    <div className={styled.creationPage}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>{ele.title}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex" }}>
        <button className={styled.button_two}  type="button" 
        onClick={()=>{
           if(pageName[10]==="Sub"){
            setNewTask(!newTask)
           } 
        }}
        >
            <img src={pageName[10]==="Sub" ?Plus_icon:done} alt="sort" style={{width:"1.5rem",height:"1.5rem"}} />
            {pageName[10]==="Sub"?<span >Add subtask</span>:<span>Mark done</span> }
          </button>

         <button
            className={styled.button_two}
            style={{ margin: "0rem 2.5rem" }}
          >
            <div>
              <img src={pageName[10]==="Sub"?sort:pen2} alt="sort" />
            </div>
            <div>
            { pageName[10]==="Sub"?  <span>Sort</span>:<span>Edit</span>}
            </div>
            </button>
          <button type="button" className={styled.pageNaveButton} onClick={() => {
            dispatch(TaskInfoStateTogg(true))
          }}>
            <img src={viewicon} alt="view" style={{width:"1rem",height:"1rem"}} />
            <span style={{ marginLeft: ".8rem" }}>Menu</span>
          </button>
        </div>
        {TaskInfoValue.taskInfoToggValue? <div className={styled.taskInfo}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize:"1.4rem"
          }}
        >
          <div>Task Info</div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <div>
              <img src={loudspeaker} alit="loudspeac" style={{width:"1.7rem",height:"1.7rem"}}/>
            </div>
            <div>
              <img src={lock} alit="loudspeac" style={{width:"1.7rem",height:"1.7rem"}}/>
            </div>
            <div>
              <img src={send} alit="loudspeac" style={{width:"1.7rem",height:"1.7rem"}}/>
            </div>
            <div>
              <img src={bin} alit="loudspeac" style={{width:"1.7rem",height:"1.7rem"}}/>
            </div>
            <div  
            onClick={()=>{
                dispatch(TaskInfoStateTogg(false))
            }}
            >
              {/* <img src={more} alit="loudspeac" style={{width:"1.8rem",height:"1.8rem"}}/> */}
              <img src={teamIcon1} alit="loudspeac" style={{width:"1.7rem",height:"1.7rem"}}/>
            </div>
            
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: ".5px solid #413E3E",
            marginTop: "2rem",
          }}
        ></div>
        {/* ////////   Setion 1   */}
        <div style={{display:"flex",justifyContent:"space-between",flexDirection:"column",height:"90%"}}>
        <div style={{ marginTop: "2rem" }}>
        <div className={styled.cutomizeSections} >
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
                    Status
                  </div>
                </div>
                <div
                      style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1rem"
                      }}
                    >
                      <img
                        src={selectedValues3[0]?.image}
                        alt=""
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
 <div>
 <span style={{color:"#ECEBEB"}}>{TaskInfoValue.taskInfoTask?.status}</span>

 </div>
                    </div>
              </div>
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
                    Priority
                  </div>
                </div>
                <div
                      style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1rem"
                      }}
                    >
                      <img
                        src={selectedValues4[0]?.image}
                        alt=""
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
 <div>
 <span style={{color:"#ECEBEB"}}>{TaskInfoValue.taskInfoTask?.priority}</span>

 </div>
                    </div>
              </div>
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
                Due date
                  </div>
                </div>
                {/* <div style={{ fontSize: "2rem", marginRight: ".5rem" }}>+</div> */}

                <span style={{color:"#ECEBEB"}}>{TaskInfoValue.taskInfoTask?.start} - {TaskInfoValue.taskInfoTask?.end}</span>
              </div>
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
                    Estimated time
                  </div>
                </div>
                <div style={{ fontSize: "2rem", marginRight: ".5rem" }}>+</div>
              </div>
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
                    Actual time
                  </div>
                </div>
                <div style={{ fontSize: "2rem", marginRight: ".5rem" }}>+</div>
              </div>
        </div>
        {/* ///////// section 2 */}
       <div style={{fontSize:"1.4rem"}}>
       <div
          style={{
            width: "100%",
            border: ".5px solid #413E3E",
          }}
        ></div>
       <div style={{ marginTop: "2rem" }}>
          <div>Assigned by</div>
          <div style={{ display: "flex", alignItems: "center",marginTop:"1.2rem" }}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "1rem",
                border: "1px solid #7f7575",
                marginRight: "1rem",
              }}
            ></div>
            <div>Ritik Sharma</div>
          </div>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <div>Assigned to</div>
          <div style={{ display: "flex", alignItems: "center",marginTop:"1.2rem" }}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "1rem",
                border: "1px solid #7f7575",
                marginRight: "1rem",
              }}
            ></div>
            <div>Ritik Sharma</div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            border: ".5px solid #413E3E",
            marginTop: "2rem",
          }}
        ></div>
       </div>
        
{/* ///////////   Section  3 */}
        <div style={{fontSize:"1.2rem",marginTop:"2rem"}}>
          <div>Labels</div>
        <div style={{display:"flex",width:"100%",alignItems:"center",gap:"2rem",marginTop:"1rem"}}>

        <div className={styled.taskInfoLabel} style={{border:" 0.5px solid #7f7575"}}>
            <div style={{width:".7rem",height:".7rem",borderRadius:".4rem",backgroundColor:"red",marginRight:"1rem",}}></div>
          
            <div>Feature</div>
          </div>
          <div className={styled.taskInfoLabel} style={{border:".5px solid #055FFC"}}>
            <div style={{width:".7rem",height:".7rem",borderRadius:".4rem",backgroundColor:"red",marginRight:"1rem",}}></div>
            <div>Important</div>
          </div>
          <div className={styled.taskInfoLabel} style={{border:" 0.5px solid #7f7575"}}>
<div>@ Add</div>
          </div>
        </div>
        </div>
        </div>
      </div>:""}
      </div>
      <div className={styled.branch_line1}>
        <div style={{ border: "0.5px solid #413E3E" }}></div>
      </div>
      {newTask ? (
        <div className={styled.editable1_sub} style={{backgroundColor:"transparent"}} >
          <div
            className={
              maximizeState
                ? `${styled.editable1_sub2}`
                : `${styled.editable1_sub1}`
            }
            style={{
                left:"15%",
                top:"20%"
            }}
          >
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
              <div>
                {/* {pageName[4].charAt(0).toUpperCase() +
                  pageName[4]
                    .slice(1)
                    .toLowerCase()
                    .replace(/([a-z])([A-Z])/g, "$1 $2")} */}
                    SubTask
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                <div
                  onClick={() => {
                    setMaximizeState(!maximizeState);
                  }}
                >
                  <img src={Maximize} alt="dsa" />
                </div>
                <div
                  className={styled.crossStyle1}
                  onClick={() => {
                    setNewTask(!newTask);
                  }}
                >
                  <img src={cross} alt="cross" className={styled.closeIcon} />
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                let CardId =
        Date.now().toString() +
        Math.random().toString(36).substring(2).toLocaleString();
                AddSubtask(
                    {
          _id: CardId,
          name: newTaskData.taskName,
          desc: newTaskData.description
            ? newTaskData.description
            : "Description of the task comes here. A brief about what the task is and ",
        
          date: "",
          tasks: [],
          start: "",
          end: "",
          progress: 40,
          type: "task",
          labels: [{
            name:"Feature",
            value:"#D9D9D9",
            status:""
          }],
          assignMem:[],
          project: "ProjecSample",
          priority: subtaskStatus.priority.value
            ? subtaskStatus.priority.value
            : "Low",
          status: subtaskStatus.status.value
            ? subtaskStatus.status.value
            : "To_do",
          markStatus:"unmark"  
        }
                );
              }}
            >
              <input
                type="text"
                defaultValue={newTaskData.taskName}
                name="taskName"
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Subtask name"
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />
              <input
                type="text"
                defaultValue={newTaskData.description}
                name="description"
                onChange={(e) => {
                  setNewTaskData({
                    ...newTaskData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Subtask Description  ..."
                style={{ padding: "1rem" }}
              />
              <div
                style={{
                  display: "flex",
                  height: "2.5rem",
                  alignItems: "center",
                  gap: "2rem",
                  marginTop: "6rem",
                }}
              >
                <div className={styled.labelButtton} onClick={() => {}}>
                  <div
                    id={0}
                    onClick={() => {
                      settoggstate1(true);
                      setSelectedDropdownIndex1(0);
                      setDropdownState1((prevState) => {
                        const newState = [...prevState];
                        newState[0] = !newState[0];
                        return newState;
                      });
                    }}
                  >
                    <img
                      src={subtaskStatus.status?.image}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>
                  <div>{subtaskStatus.status?.value}</div>

                  <div
                    style={{
                      position: "absolute",
                      top: "5rem",
                      zIndex: 20,
                      backgroundColor:
                        "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                      backdropFilter: "blur(6px)",
                      borderRadius: ".5rem",
                    }}
                  >
                    {toggstate1 && (
                      <ul
                        className={styled.priorityContainer}
                        style={{ minWidth: "11.5rem" }}
                      >
                        {[
                          { value: "To_do" },
                          { value: "Backlog" },
                          { value: "In_Progress" },
                          { value: "Done" },
                        ].map((option) => (
                          <li
                            key={option.value}
                            onClick={() => {
                                // handleOptionSelect1(option.value, 0)
                            
                                setSubtaskStatus({...subtaskStatus,
        status:{ value: option.value ,image: getImageForOption(option.value)}
        })
        settoggstate1(false);
        }
    

                            }

                            style={{
                              display: "flex",
                              gap: "1rem",
                              backgroundColor:
                                "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                            }}
                          >
                            <img src={getImageForOption(option.value)} alt="" />
                            <span style={{ fontSize: "1.2rem" }}>
                              {option.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className={styled.labelButtton} onClick={() => {}}>
                  <div
                    id={0}
                    onClick={() => {
                      settoggstate2(true);
                      setSelectedDropdownIndex2(0);
                      setDropdownState2((prevState) => {
                        const newState = [...prevState];
                        newState[0] = !newState[0];
                        return newState;
                      });
                    }}
                    className={styled.selectableDrop}
                  >
                    <img
                      src={subtaskStatus.priority?.image}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>

                  <div>{subtaskStatus.priority?.value}</div>

                  {/* ////////////////////////////////   Drop Down  */}
                  <div className={styled.priorityMainContainer}>
                    {toggstate2 && (
                      <ul
                        className={styled.priorityContainer}
                        style={{ minWidth: "9rem" }}
                      >
                        {[
                          { value: "Low" },
                          { value: "Mid" },
                          { value: "High" },
                          { value: "Urgent" },
                        ].map((option) => {
                          if (true) {
                            return (
                              <li
                                key={option.value}
                                onClick={() => {
                                //   handleOptionSelect2(option.value, 0);
                                setSubtaskStatus({...subtaskStatus,
        priority:{ value: option.value,image: getImageForOption1(option.value) }
        })
    settoggstate2(false);

                                }}
                                style={{ display: "flex", gap: "1rem" }}
                              >
                                <img
                                  src={getImageForOption1(option.value)}
                                  alt=""
                                />

                                <span style={{ fontSize: "1.2rem" }}>
                                  {option.value}
                                </span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                <div className={styled.labelButtton}>
                  <div id={0}>
                    <img
                      src={assignee}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>
                  <div>Assignee</div>
                </div>
                <div className={styled.labelButtton}>
                  <div>
                    <img
                      src={label}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>
                  <div>Label</div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  border: ".5px solid #413E3E",
                  marginTop: "2rem",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div>
                  <img
                    src={link}
                    alt="link"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}>
                    Create
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

export default PageDomainTaskFilter;
