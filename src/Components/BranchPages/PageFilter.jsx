import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "./ContainerStyle.module.css";
import viewicon from "../../assets/view.svg";
import sorticon from "../../assets/sort.svg";
import cross from "../../assets/cross.svg";
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
import Plus_icon from "../../assets/Plus_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  checkTaskAddedAction,
  domainNameToggle,
  domainNameUpdate,
  domainTaskTogg,
  domainUpdate,
} from "../../redux/domainToggSlice";
import { workspaceDataAction } from "../../redux/workspaceDataSlice";
import { myTaskDataAction } from "../../redux/myTaskSlice";
import { projectNameButton } from "../../redux/ProjectNameSlice";
import {
  CalendarStateTogg,
  CalendarStateValue,
} from "../../redux/CalendarSlice";
import { parentIdAction } from "../../redux/parentIdSlice";

function PageFilter() {
  const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  const { tabid, workspace, projectname } = useParams();

  const dispatch = useDispatch();
  const pageName = window.location.pathname.split("/");
  const domainSwitch = useSelector((state) => state.domainTask);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const workspaceDataValue = useSelector((state) => state.workspaceDataB);
  const pageNameValue = useSelector((state) => state.PageNameB);
  const calendarStateValue = useSelector((state) => state.CalendarStateB);
  const parentIdValue = useSelector((state) => state.parentIdB);

  const domainPagerValue = useSelector((state) => state.domainPageredux);
  const [maximizeState, setMaximizeState] = useState(false);
  const [taskTicketState, settaskTicketState] = useState(false);
  const [newtaskTicketValue, setnewTaskTicketValue] = useState([]);
  const [taskTicketName, settaskTicketName] = useState({
    ticketName: "",
  });

  // const[tickets,setTickets]=useState(JSON.parse(localStorage.getItem("DomainDetail"))[0]?.cards?.find((ele) => ele.id==domainSwitch.domainId)?.tasks.map((ele)=>ele) || [{title:"All"},{title:"Assigned"},{title:"Created"},{title:"Completed"}])
  const [ticketPage, setTicketPage] = useState(
    workspaceDataValue.length >= 1
      ? workspaceDataValue
      : [
          {
            title: "All",
            cards: [],
          },
          {
            title: "Backlog",
            cards: [],
          },
          {
            title: "Assigned",
            cards: [],
          },
          {
            title: "Created",
            cards: [],
          },
          {
            title: "Completed",
            cards: [],
          },
        ]
  );
  const [taskticketPage, setTaskTicketPage] = useState(
    myTaskStateValue.length >= 1
      ? myTaskStateValue
      : [
          {
            title: "All",
            cards: [],
          },
          {
            title: "Backlog",
            cards: [],
          },
          {
            title: "Assigned",
            cards: [],
          },
          {
            title: "Created",
            cards: [],
          },
          {
            title: "Completed",
            cards: [],
          },
        ]
  );
  const [pageSelec, setPageSelec] = useState("backlog");
  const [newDomain, setNewDomain] = useState(false);
  const [newTask, setNewTask] = useState(false);
  // const [newTicket, setNewTicket] = useState(false);
  // const [newTicketStatus, setNewTicketStatus] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    taskName: "",
    description: "",
  });
  const [domainData, setDomainData] = useState({
    titleName: "",
    projectName: "",
  });
  // const [ticketData, setTicketData] = useState({
  //   ticketName: "",
  // });
  // ===>  new Date(new Date().getFullYear(), new Date().getMonth(), 3)
  // Fri Mar 03 2023 00:00:00 GMT+0530 (India Standard Time)
  // ===> new Date(new Date().getFullYear(),new Date().getMonth(),2,12,18,25)
  // Thu Mar 02 2023 12:18:25 GMT+0530 (India Standard Time)
  const [domainContainer, setDomainContainer] = useState([]);

  // useEffect(() => {
  //    JSON.parse(localStorage.getItem("DomainDetail")).find((ele) => ele.id==domainSwitch.domainId)?.tasks.map((ele)=>ele).find((ele) => ele.title === "Assigned")
  // }, [domainContainer]);
  // useEffect(() => {

  //     setTicketPage(
  //       workspaceDataValue
  //     );
  // }, [newTicketStatus,window.location.pathname]);

  //   useEffect(() => {
  //     if (!workspaceDataValue) {
  //       // localStorage.setItem("DomainDetail", JSON.stringify(domainContainer));
  //     }
  //     if (!myTaskStateValue) {
  // dispatch(myTaskDataAction(domainContainer))
  //     }
  //   }, [domainContainer]);
  useEffect(() => {
    if (workspaceDataValue) {
      setDomainContainer(workspaceDataValue);
    }
  }, [newDomain]);

  //////////////////////////////////////////////////

  function handleDrop(e) {
    e.preventDefault();

    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));

    /////////////////////////////////////   myTask Panel ==>> migrate task in  targeted Ticket

    if (pageName[4] == "mytask") {
      let data = [...myTaskStateValue];
      const updatedBoard = data.map((board) => {
        if (
          board.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...board,
            cards: board.cards.filter((card) => card._id !== dragData._id),
          };
        } else {
          return board;
        }
      });
      let updatedBoard1 = updatedBoard.map((board) => {
        if (board.title === e.target.textContent) {
          return {
            ...board,
            cards: [...board.cards, dragData],
          };
        } else {
          return board;
        }
      });
      dispatch(myTaskDataAction(updatedBoard1));
      updatedTaskFunc(updatedBoard1, e.target.textContent);
    }

    /////////////////////////////////////   Domain Panel ==>>  migrate Domain in  targeted Ticket
    else {
      //////   Domain

      if (domainSwitch.value === true) {
        let data = [...workspaceDataValue];
        const updatedBoard = data.map((board) => {
          if (
            board.title ===
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          ) {
            return {
              ...board,
              cards: board.cards.filter((card) => card._id !== dragData._id),
            };
          } else {
            return board;
          }
        });
        let updatedBoard1 = updatedBoard.map((board) => {
          if (board.title === e.target.textContent) {
            return {
              ...board,
              cards: [...board.cards, dragData],
            };
          } else {
            return board;
          }
        });
        dispatch(workspaceDataAction(updatedBoard1));
        updatedTaskFunc(updatedBoard1, e.target.textContent);
        // dispatch(workspaceDataAction(data))
        // localStorage.setItem("DomainDetail", JSON.stringify(data));
        // dispatch(domainUpdate());
      }

      //////// Task
      else {
        let data = workspaceDataValue;
        let updatedCard = data
          ?.find(
            (ele) =>
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          )
          .cards.find((ele) => ele.id == domainSwitch.domainId)
          ?.tasks.map((ele) => ele)
          .find(
            (ele) =>
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
          )
          ?.cards.filter((ele, ind) => {
            if (ele.id != dragData.id) {
              return ele;
            }
          });

        data
          ?.find(
            (ele) =>
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          )
          ?.cards.find((ele) => ele.id == domainSwitch.domainId)
          ?.tasks.map((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              ele.cards = updatedCard;
            } else if (ele.title == e.target.textContent) {
              ele.cards.push(dragData);
            } else {
              return ele;
            }
          });
        // dispatch(workspaceDataAction(data))

        // localStorage.setItem("DomainDetail", JSON.stringify(data));
        dispatch(domainUpdate());
      }
    }
  }

  function handleDrop1(e) {
    e.preventDefault();

    /////////////////////////////////////   MyTAsk Panel ==>> Trash

    if (pageName[4] == "mytask") {
      const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
      console.log("udysyyds", dragData);
      let data = [...myTaskStateValue];
      let updatedBoard = data.map((board) => {
        if (
          board.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...board,
            cards: board.cards.filter((card) => card._id !== dragData._id),
          };
        } else {
          return board;
        }
      });
      let updatedBoard1 = updatedBoard.map((board) => {
        if (board.title === "All") {
          return {
            ...board,
            cards: board.cards.filter((card) => card._id !== dragData._id),
          };
        } else {
          return board;
        }
      });

      dispatch(myTaskDataAction(updatedBoard1));

      updatedTaskFunc(updatedBoard1, null);


      //       dispatch(domainUpdate());
    }

    /////////////////////////////////////   Domain and its Task ::--Trash

    //////  Domain
    else {
      if (domainSwitch.value) {
        const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
        let data = [...workspaceDataValue];
        let updatedBoard = data.map((board) => {
          if (
            board.title ===
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          ) {
            return {
              ...board,
              cards: board.cards.filter((card) => card._id !== dragData._id),
            };
          } else {
            return board;
          }
        });
        let updatedBoard1 = updatedBoard.map((board) => {
          if (board.title === "All") {
            return {
              ...board,
              cards: board.cards.filter((card) => card._id !== dragData._id),
            };
          } else {
            return board;
          }
        });
        dispatch(workspaceDataAction(updatedBoard1));
        updatedTaskFunc(updatedBoard1, null);

        // localStorage.setItem("DomainDetail", JSON.stringify(data));
        // dispatch(domainUpdate());
      }

      ////////   Team
      else {
        const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
        let data = workspaceDataValue;

        let updatedCard = data
          ?.find(
            (ele) =>
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          )
          ?.cards.find((ele) => ele.id == domainSwitch.domainId)
          ?.tasks.map((ele) => ele)
          .find(
            (ele) =>
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
          )
          ?.cards.filter((ele, ind) => {
            if (ele.id != dragData.id) {
              return ele;
            }
          });
        let updatedCard1 = data
          ?.find(
            (ele) =>
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          )
          ?.cards.find((ele) => ele.id == domainSwitch.domainId)
          ?.tasks.map((ele) => ele)
          .find((ele) => ele.title == "All")
          ?.cards.filter((ele, ind) => {
            if (ele.id != dragData.id) {
              return ele;
            }
          });

        data
          ?.find(
            (ele) =>
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
          )
          ?.cards.find((ele) => ele.id == domainSwitch.domainId)
          ?.tasks.map((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              ele.cards = updatedCard;
            } else if (ele.title == "All") {
              ele.cards = updatedCard1;
            } else {
              return ele;
            }
          });
        // dispatch(workspaceDataAction(data))

        // localStorage.setItem("DomainDetail", JSON.stringify(data));
        dispatch(domainUpdate());
      }
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  /////////////////////////////////
  const [domainDetail3, setDomainDetail3] = useState(
    myTaskStateValue
      ?.find(
        (ele) =>
          ele.title ==
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
      )
      ?.cards.map((ele) => ele) || []
  );
  ///////////////////////////////////////////  3
  const [selectedValues3, setSelectedValues3] = useState([]);
  const [selectedDropdownIndex3, setSelectedDropdownIndex3] = useState(null);
  const [dropdownState3, setDropdownState3] = useState([]);
  const [toggstate3, settoggstate3] = useState(false);

  useEffect(() => {
    setSelectedValues3([{ image: To_do, value: "To_do" }]);
    setDropdownState3(domainDetail3.map(() => false));
  }, [domainDetail3]);

  const handleOptionSelect3 = (option, index) => {
    setSelectedValues3((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption(option) };
      return newValues;
    });
    setDropdownState3((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate3(false);
  };

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

  ////////////////////////////////////////////   4

  const [selectedValues4, setSelectedValues4] = useState([]);
  const [selectedDropdownIndex4, setSelectedDropdownIndex4] = useState(null);
  const [dropdownState4, setDropdownState4] = useState([]);
  const [toggstate4, settoggstate4] = useState(false);

  useEffect(() => {
    setSelectedValues4([{ image: Low, value: "Low" }]);
    setDropdownState4(domainDetail3.map(() => false));
  }, [domainDetail3]);

  const handleOptionSelect4 = (option, index) => {
    setSelectedValues4((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption1(option) };
      return newValues;
    });
    setDropdownState4((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate4(false);
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
  function AddTaskFunc() {
    /////////////////////////////////   Add Task in My Task

    if (pageName[4] == "mytask") {
      let CardId =
        Date.now().toString() +
        Math.random().toString(36).substring(2).toLocaleString();

      const unshiftTask = async (userData) => {
        let res, data;
        const tokenObject = JSON.parse(localStorage.getItem("userToken"));
        if (tokenObject.tokenStatus === "manual") {
          res = await fetch(`http://localhost:8000/user/mytask/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tokenData: {
                token: tokenObject.tokenGen,
                project: pageName[2],
                kanbanData: {
                  data: userData,
                  ticketName:
                    pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1),
                },
              },
            }),
          });
        }
        data = await res.json();
        if (data.status === 422) {
          console.log("Project Name Not Updated", data);
        } else {
          console.log("Added Task in Mytask PageFilter");
          dispatch(
            myTaskDataAction(
              data.updatedUser.projects.find((ele, ind) => {
                if (ele.projectName == projectname) return ele;
              }).myTask
            )
          );
        }
      };
      unshiftTask({
        _id: CardId,
        name: newTaskData.taskName,
        desc: newTaskData.description
          ? newTaskData.description
          : "Description of the task comes here. A brief about what the task is and ",

        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        tasks: [
          {
            subtask: [],
            issues: [],
            files: [],
            review: [],
          },
        ],
        start: "",
        end: "",
        tag: "tag",
        type: "task",
        labels: [
          {
            name: "Feature",
            value: "#D9D9D9",
            status: "labeltick",
          },
        ],
        parentId:parentIdValue,
        assignMem: [],
        project: "ProjecSample",
        priority: selectedValues4[0].value ? selectedValues4[0].value : "Low",
        status: selectedValues3[0].value ? selectedValues3[0].value : "To_do",
      });
      // dispatch(checkTaskAddedAction());
      setNewTask(!newTask);
    }
    //////////////     Domain    ////////////////////
    //////////////////////     Domain Panel -- Add Task in Domain
    else {
      const unshiftTask = async (userData) => {
        let res, data;
        const tokenObject = JSON.parse(localStorage.getItem("userToken"));

        if (true) {
          res = await fetch(`http://localhost:8000/user/workspace/task`, {
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
                },
              },
            }),
          });
          data = await res.json();
          if (data.status === 422) {
            console.log("Project Name Not Updated", data);
          } else {
            console.log(
              "Yes Task of Domain Successfully Updated22ADfd",
              data.updatedData.projects
                .find((ele, ind) => {
                  if (ele.projectName == projectname) return ele;
                })
                .workSpace.find((ele, ind) => {
                  if (ele.name === workspace) return ele;
                }).data
            );

            dispatch(
              workspaceDataAction(
                data.updatedData.projects
                  .find((ele, ind) => {
                    if (ele.projectName == projectname) return ele;
                  })
                  .workSpace.find((ele, ind) => {
                    if (ele.name === workspace) return ele;
                  }).data
              )
            );

            setNewTask(!newTask);
          }
        }
      };
      unshiftTask({
        _id: Date.now().toString() + Math.random().toString(36).substring(2),
        name: newTaskData.taskName,
        desc: newTaskData.description
          ? newTaskData.description
          : "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
        labels: [
          {
            name: "Feature",
            value: "#D9D9D9",
            status: "labeltick",
          },
        ],
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
        tasks: [
          {
            subtask: [],
            issues: [],
            files: [],
            review: [],
          },
        ],
        start: "",
        end: "",
        tag: "tag",
        type: "task",
        labels: [
          {
            name: "Feature",
            value: "#D9D9D9",
            status: "labeltick",
          },
        ],
        assignMem: [],
        project: "ProjecSample",
        priority: selectedValues4[0].value ? selectedValues4[0].value : "Low",
        status: selectedValues3[0].value ? selectedValues3[0].value : "To_do",
      });

      // let insertCard = workspaceDataValue
      // let CardId =
      //   Date.now().toString() +
      //   Math.random().toString(36).substring(2).toLocaleString();
      // let AllBoardnewOne = insertCard
      //   ?.find(
      //     (ele) =>
      //       ele.title ==
      //       pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
      //   )
      //   ?.cards.find((ele) => ele.id == domainSwitch.domainId)
      //   .tasks.find((ele, ind) => {
      //     if (ele.title == "All") {
      //       ele.cards.unshift({
      //         id: CardId,
      //         name: newTaskData.taskName,
      //         desc: newTaskData.description
      //           ? newTaskData.description
      //           : "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
      // labels: {
      //   name:"Feature",
      //   value:"#D9D9D9",
      //   status:""
      // },
      //         date: "",
      //         tasks: [],
      //         start: "",
      //         end: "",
      //                  tag:"tag",

      //         type: "task",
      //         project: "ProjecSample",
      //         priority: "Low",
      //         status: "To_do",
      //       });
      //     } else if (
      //       ele.title ==
      //       pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
      //     ) {
      //       ele.cards.unshift({
      //         id: CardId,
      //         name: newTaskData.taskName,
      //         desc: newTaskData.description
      //           ? newTaskData.description
      //           : "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
      // labels: {
      //   name:"Feature",
      //   value:"#D9D9D9",
      //   status:""
      // },
      //         date: "",
      //         tasks: [],
      //         start: "",
      //         end: "",
      //                 tag:"tag",

      //         type: "task",
      //         project: "ProjecSample",
      //         priority: "Low",
      //         status: "To_do",
      //       });
      //     }
      //   });
      // localStorage.setItem("DomainDetail", JSON.stringify(insertCard));
      // dispatch(checkTaskAddedAction());
      // setNewTask(!newTask);
    }
  }
  function AddDomainFunc(data) {
    const unshiftDomain = async (userData) => {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));
      if (tokenObject.tokenStatus === "manual") {
        res = await fetch(`http://localhost:8000/user/workspace/domain`, {
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
                ticketName:
                  pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1),
              },
            },
          }),
        });
      }
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Yes Domain Updated Successfully 124334", data.updatedUser);
        // console.log("Yes Domain Updated Successfully 124334",data.updatedUser.projects.find((ele,ind)=>{
        //   if(ele.projectName==projectname)
        //   return ele;
        // }).workSpace.find((ele,ind)=>{
        //   if(ele.name==pageName[4])
        //   return ele;
        // }).data);
        dispatch(
          workspaceDataAction(
            data.updatedUser.projects
              .find((ele, ind) => {
                if (ele.projectName == projectname) return ele;
              })
              .workSpace.find((ele, ind) => {
                if (ele.name == pageName[4]) return ele;
              }).data
          )
        );
      }
    };

    unshiftDomain(data);
  }
  function updatedDomains() {
    let DomainID =
      Date.now().toString() + Math.random().toString(36).substring(2);
    // Targeted Ticket And All
    AddDomainFunc({
      _id: DomainID,
      name: domainData.titleName,
      tag: "tag",
      type: "task",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
      desc: "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
      priority: "Low",
      status: "To_do",
      start: "",
      end: "",
      labels: [
        {
          name: "Feature",
          value: "#D9D9D9",
          status: "labeltick",
        },
      ],
      assignMem: [],
      tasks: [
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2),
          title: "All",
          cards: [],
        },
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2),
          title: "Backlog",
          cards: [],
        },
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2),
          title: "Assigned",
          cards: [],
        },
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2),
          title: "Created",
          cards: [],
        },
        {
          _id: Date.now().toString() + Math.random().toString(36).substring(2),
          title: "Completed",
          cards: [],
        },
      ],
    });

    // domainContainer.map((ele, ind) => {
    //   if (
    //     ele.title ==
    //     pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
    //   ) {
    //     ele.cards.unshift({
    //       id: DomainID,
    //       name: domainData.titleName,
    //               tag:"tag",

    //       type: "task",
    //       date: "",
    //       desc: "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
    //       project: domainData.projectName,
    //       start: new Date(
    //         new Date().getFullYear(),
    //         new Date().getMonth(),
    //         1
    //       ),
    //       end: new Date(
    //         new Date().getFullYear(),
    //         new Date().getMonth(),
    //         2,
    //         12,
    //         18
    //       ),
    //       priority: "Low",
    //       status: "To_do",
    //       tasks: [],
    //     });
    //     return ele;
    //   } else if (ele.title == "All") {
    //     ele.cards.unshift({
    //       id: DomainID,
    //       name: domainData.titleName,
    //               tag:"tag",

    //       type: "task",
    //       date: "",
    //       desc: "Description of the task comes here. A brief about what the task is and it’s details in 1 or 2 sentences",
    //       project: domainData.projectName,
    //       start: new Date(
    //         new Date().getFullYear(),
    //         new Date().getMonth(),
    //         1
    //       ),
    //       end: new Date(
    //         new Date().getFullYear(),
    //         new Date().getMonth(),
    //         2,
    //         12,
    //         18
    //       ),
    //       priority: "Low",
    //       status: "To_do",
    //       tasks: [],
    //     });
    //     return ele;
    //   } else {
    //     return ele;
    //   }
    // });
    // localStorage.setItem(
    //   "DomainDetail",
    //   JSON.stringify(domainContainer)
    // );
  }
  /////////////////////////////   Update function.....

  function updatedTaskFunc(updatedData, migrateState) {
    setIsDraggingOver(false);
    let targetTitle;
    if (pageName[4] === "mytask") {
      targetTitle = pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1);
    } else {
      targetTitle = pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1);
    }

    async function myTaskFunc(ticket, updatedData, migrateState) {

      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));
      if (pageName[4] === "mytask") {
        if (migrateState != null) {
          res = await fetch(`http://localhost:8000/user/myTask/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "manual",
              tokenData: {
                token: tokenObject.tokenGen,
                project: tokenObject.projectName,
                kanbanData: {
                  data: updatedData.find((ele, ind) => {
                    if (ele.title == ticket) return ele;
                  }),
                  data1: updatedData.find((ele, ind) => {
                    if (ele.title == migrateState) return ele;
                  }),
                  ticketName: ticket,
                },
                migrationState: {
                  state: true,
                  value: migrateState,
                },
              },
            }),
          });
        } else {
          console.log("audusayd342423",updatedData.find((ele, ind) => {
            if (ele.title == ticket) return ele;
          }),updatedData.find((ele, ind) => {
            if (ele.title == "All") return ele;
          }),ticket,)
          res = await fetch(`http://localhost:8000/user/myTask/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "manual",
              tokenData: {
                token: tokenObject.tokenGen,
                project: tokenObject.projectName,
                kanbanData: {
                  data: updatedData.find((ele, ind) => {
                    if (ele.title == ticket) return ele;
                  }),
                  data1: updatedData.find((ele, ind) => {
                    if (ele.title == "All") return ele;
                  }),
                  ticketName: ticket,
                },
                migrationState: {
                  state: false,
                  value: "",
                },
              },
            }),
          });
        }
      }
      //////////////////////////////   Domains
      else {
        if (migrateState != null) {
          res = await fetch(`http://localhost:8000/user/domain/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "manual",
              tokenData: {
                token: tokenObject.tokenGen,
                project: tokenObject.projectName,
                kanbanData: {
                  data: updatedData.find((ele, ind) => {
                    if (ele.title == ticket) return ele;
                  }),
                  data1: updatedData.find((ele, ind) => {
                    if (ele.title == migrateState) return ele;
                  }),
                  ticketName: ticket,
                },
                workspaceName: workspace,
                migrationState: {
                  state: true,
                  value: migrateState,
                },
              },
            }),
          });
        } else {
          res = await fetch(`http://localhost:8000/user/domain/update`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              source: "manual",
              tokenData: {
                token: tokenObject.tokenGen,
                project: tokenObject.projectName,
                kanbanData: {
                  data: updatedData.find((ele, ind) => {
                    if (ele.title == ticket) return ele;
                  }),
                  data1: updatedData.find((ele, ind) => {
                    if (ele.title == "All") return ele;
                  }),
                  ticketName: ticket,
                },
                workspaceName: workspace,
                migrationState: {
                  state: false,
                  value: "",
                },
              },
            }),
          });
        }
      }

      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
        console.log("SararCome",data.updatedUser)
      }
    }
    myTaskFunc(targetTitle, updatedData, migrateState);
  }
  ////////////////////////////////////  Calendar    ///////////////////////

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };
  const calendarRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setStartDate(null);
        setEndDate(null);
        dispatch(CalendarStateTogg(false));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(pageNameValue=="myTask")
    setnewTaskTicketValue(
      myTaskStateValue.filter((ele, ind) => {
        if (ind > 4) {
          return ele;
        }
      })
    );
    else{
      if(domainSwitch.domainId!="")
  {
    console.log("jkahsasAAHHD")

    setnewTaskTicketValue(
      workspaceDataValue.find((ele,ind)=>{
        if(ele.title==pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1))
        return ele;
       }).cards.find((ele,ind)=>{
        if(ele._id==domainSwitch.domainId)
        return ele;
       })?.tasks.filter((ele, ind) => {
        if (ind > 4) {
          return ele;
        }
      })
    );
  }
      else
    {
      console.log("jkahsas")
      setnewTaskTicketValue(
        workspaceDataValue.filter((ele, ind) => {
          if (ind > 4) {
            return ele;
          }
        })
      );
    }
    }
  }, [window.location.pathname, myTaskStateValue,workspaceDataValue]);
  
  /////////////////////////////////////////////
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function handleDragEnter() {
    setIsDraggingOver(true);
  }

  function handleDragLeave() {
    setIsDraggingOver(false);
  }
////////////////////////////////////////////////   MyTask    ////////////////////////////////////////////////////
//   Add ticket on My task 

async function addTaskTicket(tokenObject) {
    let res = await fetch(
       `http://localhost:8000/user/mytask/add/ticket`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           tokenData: {
             token: tokenObject.tokenGen,
             project: pageName[2],
           },
           ticketName: {
             title:
               taskTicketName.ticketName
                 .charAt(0)
                 .toUpperCase() +
               taskTicketName.ticketName.slice(1).toLowerCase(),
             cards: [],
           },
         }),
       }
     );
   let  data = await res.json();
    if(data.status!=422){
     dispatch(
       myTaskDataAction(
         data.updatedUser.projects.find((ele, ind) => {
           if (ele.projectName == tokenObject.projectName)
             return ele;
         }).myTask
       )
     );
     setnewTaskTicketValue(
       data.updatedUser.projects
         .find((ele, ind) => {
           if (ele.projectName == tokenObject.projectName)
             return ele;
         })
         .myTask.filter((ele, ind) => {
           if (ind > 4) {
             return ele;
           }
         })
     );
   settaskTicketState(!taskTicketState);

    }
   }
   
////////////////////////////////////////////////   MyTask    ////////////////////////////////////////////////////


////////////////////////////////////////////////   Domains    ////////////////////////////////////////////////////
// Add ticket in Domains

async function addNewDomainsTicket(tokenObject) {
  console.log("DomaniinnDomaminnn")

  let res = await fetch(
     `http://localhost:8000/user/add/Domain/ticket`,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         tokenData: {
           token: tokenObject.tokenGen,
           project: pageName[2],
         },
         ticketName: {
           title:
             taskTicketName.ticketName
               .charAt(0)
               .toUpperCase() +
             taskTicketName.ticketName.slice(1).toLowerCase(),
           cards: [],
         },
         workspaceName:pageName[4]
       }),
     }
   );
 let  data = await res.json();
  if(data.status!=422){
   dispatch(
     workspaceDataAction(
       data.updatedUser.projects.find((ele)=>{
        if(ele.projectName==projectname)
        return ele;
      }).workSpace.find((ele)=>{
        if(ele.name==workspace)
        return ele
      }).data
     )
   );
   setnewTaskTicketValue(
     data.updatedUser.projects.find((ele)=>{
      if(ele.projectName==projectname)
      return ele;
    }).workSpace.find((ele)=>{
      if(ele.name==workspace)
      return ele
    }).data.filter((ele, ind) => {
         if (ind > 4) {
           return ele;
         }
       })
   );
 settaskTicketState(!taskTicketState);

  }
 }

// Add ticket in Domains Tasks
 async function addNewDomainsTaskTicket(tokenObject) {
  console.log("Domaniinn Taskkkk")
  let res = await fetch(
     `http://localhost:8000/user/add/Domain/task/ticket`,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         tokenData: {
           token: tokenObject.tokenGen,
           project: pageName[2],
         },
         ticketName: {
           title:
             taskTicketName.ticketName
               .charAt(0)
               .toUpperCase() +
             taskTicketName.ticketName.slice(1).toLowerCase(),
           cards: [],
         },
         workspaceName:pageName[4],
         domainTicketName:pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1),
         domainName:domainSwitch.name
       }),
     }
   );
 let  data = await res.json();
  if(data.status!=422){
    dispatch(
      workspaceDataAction(
        data.updatedUser.projects.find((ele)=>{
         if(ele.projectName==projectname)
         return ele;
       }).workSpace.find((ele)=>{
         if(ele.name==workspace)
         return ele
       }).data
      )
    );
    setnewTaskTicketValue(
      data.updatedUser.projects.find((ele)=>{
       if(ele.projectName==projectname)
       return ele;
     }).workSpace.find((ele)=>{
       if(ele.name==workspace)
       return ele
     }).data.find((ele,ind)=>{
      if(ele.title==pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1))
      return ele;
     }).cards.find((ele,ind)=>{
      if(ele._id==domainSwitch.domainId)
      return ele;
     }).tasks.filter((ele, ind) => {
          if (ind > 4) {
            return ele;
          }
        })
    );
  settaskTicketState(!taskTicketState);

  }
 }

////////////////////////////////////////////////   Domains    ////////////////////////////////////////////////////




  return (
    <>
      <div className={styled.section3}>
        {pageName[5] === "Domains" || pageNameValue == "myTask" ? (
          <>
            <div style={{ display: "flex" }}>
              <div className={styled.section3_Left_container}>
                {pageNameValue == "myTask"
                  ? [
                      { title: "All" },
                      { title: "Backlog" },
                      { title: "Assigned" },
                      { title: "Created" },
                      { title: "Completed" },
                    ].map((ele, ind) => {
                      return (
                        <div
                          className={styled.section3_Left}
                          onDrop={(e) => handleDrop(e)}
                          onDragOver={(e) => {
                            handleDragOver(e);
                            e.target.style.color = "#7f7575";
                          }}
                          //                     onDragLeave={(e) => {
                          //   e.target.style.color = "#7f7575";
                          // }}
                          onDragStart={(e) => {
                            e.target.style.color = "#fff";
                          }}
                        >
                          <Link
                            to={
                              pageNameValue === "myTask"
                                ? `/home/${projectname}/${tabid}/mytask/${ele.title.toLowerCase()}`
                                : domainSwitch.value
                                ? `/home/${projectname}/${tabid}/${workspace}/Domains/${ele.title.toLowerCase()}/list`
                                : `/home/${projectname}/${tabid}/${workspace}/Domains/${
                                    pageName[6]
                                  }/list/${ele.title.toLowerCase()}`
                            }
                            className={
                              pageNameValue === "myTask"
                                ? pageName[5] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : domainSwitch.value
                                ? pageName[6] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : pageName[8] === `${ele.title.toLowerCase()}`
                                ? styled.link_togg
                                : styled.link
                            }
                            onClick={() => {
                              dispatch(
                                domainNameToggle(ele.title.toLowerCase())
                              );

                              setPageSelec(`${ele.title.toLowerCase()}`);
                            }}
                          >
                            <div className={styled.creationPage}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    marginRight: ".8rem",
                                    border: domainSwitch.value
                                      ? pageName[5] == ele.title.toLowerCase()
                                        ? "1px dashed #E7E6E6"
                                        : "1px dashed"
                                      : pageName[8] == ele.title
                                      ? "1px dashed #E7E6E6"
                                      : "1px dashed",
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "1rem",
                                  }}
                                ></div>
                                <div style={{color:pageName[5] == ele.title.toLowerCase()?"#fff":""}}>{ele.title}</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  : [
                      { title: "All" },
                      { title: "Backlog" },
                      { title: "Assigned" },
                      { title: "Created" },
                      { title: "Completed" },
                    ].map((ele, ind) => {
                      return (
                        <div
                          className={styled.section3_Left}
                          onDrop={(e) => handleDrop(e)}
                          onDragOver={(e) => {
                            handleDragOver(e);
                            e.target.style.color = "#7f7575";
                          }}
                          //                     onDragLeave={(e) => {
                          //   e.target.style.color = "#7f7575";
                          // }}
                          onDragStart={(e) => {
                            e.target.style.color = "#fff";
                          }}
                        >
                          <Link
                            to={
                              pageName[4] === "mytask"
                                ? `/home/${projectname}/${tabid}/mytask/${ele.title.toLowerCase()}`
                                : domainSwitch.value
                                ? `/home/${projectname}/${tabid}/${workspace}/Domains/${ele.title.toLowerCase()}/list`
                                : `/home/${projectname}/${tabid}/${workspace}/Domains/${
                                    pageName[6]
                                  }/list/${ele.title.toLowerCase()}`
                            }
                            className={
                              pageName[4] === "mytask"
                                ? pageName[5] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : domainSwitch.value
                                ? pageName[6] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : pageName[8] === `${ele.title.toLowerCase()}`
                                ? styled.link_togg
                                : styled.link
                            }
                            onClick={() => {
                              dispatch(
                                domainNameToggle(ele.title.toLowerCase())
                              );

                              setPageSelec(`${ele.title.toLowerCase()}`);
                            }}
                          >
                            <div className={styled.creationPage}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    marginRight: ".8rem",
                                    border: domainSwitch.value
                                      ? pageName[6] == ele.title
                                        ? "1px dashed #E7E6E6"
                                        : "1px dashed"
                                      : pageName[8] == ele.title
                                      ? "1px dashed #E7E6E6"
                                      : "1px dashed",
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "1rem",
                                  }}
                                ></div>
                                <div>{ele.title}</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                {pageNameValue == "myTask" || pageNameValue == "Workspace"
                  ? newtaskTicketValue.map((ele, ind) => {
                      return (
                        <div
                          className={styled.section3_Left}
                          onDrop={(e) => handleDrop(e)}
                          onDragOver={(e) => {
                            handleDragOver(e);
                            e.target.style.color = "#7f7575";
                          }}
                          // //                     onDragLeave={(e) => {
                          // //   e.target.style.color = "#7f7575";
                          // // }}
                          onDragStart={(e) => {
                            e.target.style.color = "#fff";
                          }}
                        >
                          <Link
                            to={
                              pageNameValue === "myTask"
                                ? `/home/${projectname}/${tabid}/mytask/${ele.title.toLowerCase()}`
                                : domainSwitch.value
                                ? `/home/${projectname}/${tabid}/${workspace}/Domains/${ele.title.toLowerCase()}/list`
                                : `/home/${projectname}/${tabid}/${workspace}/Domains/${
                                    pageName[6]
                                  }/list/${ele.title.toLowerCase()}`
                            }
                            className={
                              pageNameValue === "myTask"
                                ? pageName[5] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : domainSwitch.value
                                ? pageName[6] === `${ele.title.toLowerCase()}`
                                  ? styled.link_togg
                                  : styled.link
                                : pageName[8] === `${ele.title.toLowerCase()}`
                                ? styled.link_togg
                                : styled.link
                            }
                            onClick={() => {
                              dispatch(
                                domainNameToggle(ele.title.toLowerCase())
                              );

                              setPageSelec(`${ele.title.toLowerCase()}`);
                            }}
                          >
                            <div className={styled.creationPage}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    marginRight: ".8rem",
                                    border: domainSwitch.value
                                      ? pageName[6] == ele.title
                                        ? "1px dashed #E7E6E6"
                                        : "1px dashed"
                                      : pageName[8] == ele.title
                                      ? "1px dashed #E7E6E6"
                                      : "1px dashed",
                                    width: "1rem",
                                    height: "1rem",
                                    borderRadius: "1rem",
                                  }}
                                ></div>
                                <div>{ele.title}</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  // setNewTicket(!newTicket);
                  if (pageName[4] == "mytask" || pageNameValue == "Workspace") {
                    // AddTaskTicket()
                    settaskTicketState(!taskTicketState);
                  }
                }}
              >
                <img src={Plus_icon} alt="Plus_icon" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "2rem",
                }}
                onDrop={(e) => {
                  handleDrop1(e);
                }}
                onDragOver={handleDragOver}
              >
                <i
                  className="fa-solid fa-trash-can"
                  style={{
                    fontSize: isDraggingOver ? "3rem" : "1.5rem",
                    boxShadow: isDraggingOver
                      ? "0px 0px 10px 5px rgba(0, 0, 0, 0.5)"
                      : "none",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                ></i>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex" }}>
            <div className={styled.section3_Left}>
              <Link
                to={`/home/${projectname}/${tabid}/${workspace}/Overview`}
                className={
                  pageName[5] === "Overview" ? styled.link_togg : styled.link
                }
                onClick={() => {
                  // setPageSelec("all");
                }}
              >
                <div className={styled.creationPage}>
                  <div>
                    <p>Overview</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styled.section3_Left} onClick={() => {}}>
              <Link
                to={`/home/${projectname}/${tabid}/${workspace}/Domains/all/list`}
                className={
                  pageName[5] === "Domains" ? styled.link_togg : styled.link
                }
                onClick={() => {
                  setPageSelec("all");
                  //     dispatch(domainTaskTogg())
                  // dispatch(domainUpdate())
                  // dispatch(domainNameUpdate({name:"",domainId:""}))
                }}
              >
                <div className={styled.creationPage}>
                  <div>
                    <p> Domains</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styled.section3_Left}>
              <Link
                to={`/home/${projectname}/${tabid}/${workspace}/RoadMap`}
                className={
                  pageName[5] === "RoadMap" ? styled.link_togg : styled.link
                }
                onClick={() => {
                  setPageSelec("all");
                }}
              >
                <div className={styled.creationPage}>
                  <div>
                    <p>RoadMap</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styled.section3_Left}>
              <Link
                to={`/home/${projectname}/${tabid}/${workspace}/Spaces/`}
                className={
                  pageName[5] === "Spaces" ? styled.link_togg : styled.link
                }
                onClick={() => {
                  // setPageSelec("all");
                }}
              >
                <div className={styled.creationPage}>
                  <div>
                    <p>Spaces</p>
                  </div>
                </div>
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={Plus_icon} alt="Plus_icon" />
            </div>
          </div>
        )}
        <div style={{ display: "flex" }}>
          <button className={styled.button_two}>
            <img src={sorticon} alt="sort" />
            Sort
          </button>
          <button
            className={styled.button_two}
            style={{ margin: "0rem 2.5rem" }}
          >
            <img src={viewicon} alt="view" />
            View
          </button>
          <button
            className={styled.pageNaveButton}
            onClick={() => {
              if (pageName[6] !== "all" && pageName[8] !== "all") {
                if (pageName[5] === "Domains") {
                  if (domainSwitch.value === true) {
                    setNewDomain(!newDomain);
                  } else {
                    setNewTask(!newTask);
                  }
                } else if (pageName[4] === "mytask") {
                  if (pageName[5] !== "all") {
                    setNewTask(!newTask);
                  }
                }
              }
            }}
          >
            <span style={{ marginRight: ".8rem", fontSize: "1.6rem" }}>+</span>

            {domainSwitch.value && pageName[4] != "mytask" ? (
              <span>Add Domain</span>
            ) : (
              <span>Add Task</span>
            )}
          </button>
        </div>
      </div>
      <div className={styled.branch_line1}>
        <div style={{ border: "0.5px solid #413E3E" }}></div>
      </div>
      {/* ///////////////////////////////
      //////////////  Domain     /////////////////
      ///////////////////////////////*/}

      {newDomain ? (
        <div className={styled.editable1_sub}>
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
              <div>New Domain</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setNewDomain(!newDomain);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatedDomains();
                setNewDomain(!newDomain);
                dispatch(domainUpdate());
              }}
            >
              <input
                type="text"
                defaultValue={domainData.titleName}
                name="titleName"
                onChange={(e) => {
                  setDomainData({
                    ...domainData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Domain Name ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />
              {/* <input
                type="text"
                defaultValue={domainData.projectName}
                name="projectName"
                onChange={(e) => {
                  setDomainData({
                    ...domainData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Add Project Name ..."
                style={{ resize: "none", padding: "1rem" }}
              /> */}

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
      {/* ///////////////////////////////
      ////////////// Add New Ticket  :-- Task   /////////////////
      ///////////////////////////////*/}

      {taskTicketState ? (
        <div className={styled.editable1_sub}>
          <div
            className={styled.editable1_sub1}
            style={{ width: "35rem", left: "40%" }}
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
              <div>New Ticket</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  if (pageName[4] == "mytask" || pageNameValue == "Workspace") {
                    settaskTicketState(false);
                  }
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const tokenObject = JSON.parse(
                  localStorage.getItem("userToken")
                );
                if (pageName[4] == "mytask") {
                  addTaskTicket(tokenObject);
                } else {
                  if(domainSwitch.domainId != "")
                  addNewDomainsTaskTicket(tokenObject)
                  else
                  addNewDomainsTicket(tokenObject);
                }
              }}
            >
              <input
                type="text"
                defaultValue={taskTicketName.ticketName}
                name="ticketName"
                onChange={(e) => {
                  settaskTicketName({
                    ...taskTicketName,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Ticket Name ..."
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
                  <button type="submit" className={styled.AddStyle} style={{minHeight:"3rem"}}>
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
      {/* ///////////////////////////////
      ///////////////////////////////
      //////////////  Task     /////////////////
      ///////////////////////////////
      ///////////////////////////////*/}
      {newTask ? (
        <div className={styled.editable1_sub}>
          <div
            className={
              maximizeState
                ? `${styled.editable1_sub2}`
                : `${styled.editable1_sub1}`
            }
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
                {pageName[4].charAt(0).toUpperCase() +
                  pageName[4]
                    .slice(1)
                    .toLowerCase()
                    .replace(/([a-z])([A-Z])/g, "$1 $2")}
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
                AddTaskFunc();
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
                placeholder="Task name"
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
                placeholder="Add Description  ..."
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
                      settoggstate3(true);
                      setSelectedDropdownIndex3(0);
                      setDropdownState3((prevState) => {
                        const newState = [...prevState];
                        newState[0] = !newState[0];
                        return newState;
                      });
                    }}
                  >
                    <img
                      src={selectedValues3[0]?.image}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>
                  <div>{selectedValues3[0]?.value}</div>

                  {/* ////////////////////////////////   Drop Down  */}
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
                    {toggstate3 && (
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
                            onClick={() => handleOptionSelect3(option.value, 0)}
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
                      settoggstate4(true);
                      setSelectedDropdownIndex4(0);
                      setDropdownState4((prevState) => {
                        const newState = [...prevState];
                        newState[0] = !newState[0];
                        return newState;
                      });
                    }}
                    className={styled.selectableDrop}
                  >
                    <img
                      src={selectedValues4[0]?.image}
                      alt=""
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  </div>

                  <div>{selectedValues4[0]?.value}</div>

                  {/* ////////////////////////////////   Drop Down  */}
                  <div className={styled.priorityMainContainer}>
                    {toggstate4 && (
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
                                  handleOptionSelect4(option.value, 0);
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
                  <button type="submit" className={styled.AddStyle} style={{minHeight:"3rem"}}>
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

      {false ? (
        <div className={styled.editable1_sub}>
          <div className={styled.editable1_sub1}>
            <div
              style={{
                display: "flex",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "1.8rem",
              }}
            >
              <div>New Domain</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  setNewDomain(!newDomain);
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDomainContainer([
                  ...domainContainer,
                  {
                    id:
                      Date.now().toString() +
                      Math.random().toString(36).substring(2),
                    name: domainData.titleName,
                    tag: "tag",
                    type: "task",
                    tasks: [],
                    project: domainData.projectName,
                    start: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ),
                    end: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      2,
                      12,
                      18
                    ),
                  },
                ]);
                setNewDomain(!newDomain);
                dispatch(domainUpdate());
              }}
            >
              <input
                type="text"
                defaultValue={domainData.titleName}
                name="titleName"
                onChange={(e) => {
                  setDomainData({
                    ...domainData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Domain Name ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />
              <input
                type="text"
                defaultValue={domainData.projectName}
                name="projectName"
                onChange={(e) => {
                  setDomainData({
                    ...domainData,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Add Project Name ..."
                style={{ resize: "none", padding: "1rem" }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1rem",
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

export default PageFilter;
