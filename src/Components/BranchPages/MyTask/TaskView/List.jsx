import React, { useEffect, useRef, useState } from "react";

import rightarrow from "../../../../assets/rightarrow.svg";
import tag from "../../../../assets/tag.svg";
import redTag from "../../../../assets/redTag.svg";
import greenTag from "../../../../assets/greenTag.svg";
import profile from "../../../../assets/profile.svg";
import To_do from "../../../../assets/todoS.svg";
import In_Progress from "../../../../assets/progS.svg";
import Done from "../../../../assets/doneS.svg";
import Backlog from "../../../../assets/backS.svg";
import Urgent from "../../../../assets/urgentPrio.svg";
import Mid from "../../../../assets/midPrio.svg";
import Low from "../../../../assets/lowPrio.svg";
import High from "../../../../assets/highPrio.svg";
import cross from "../../../../assets/cross.svg";
import DateSvg from "../../../../assets/Date.svg";
import labeluntick from "../../../../assets/labeluntick.svg";
import labeltick from "../../../../assets/labeltick.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styled from "../../../BranchPages/WorkSpacePages/DomainPages/DomainPageStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { myTaskDataAction } from "../../../../redux/myTaskSlice";
import {
  CalendarStateTogg,
  labelStateTogg,
  labelStateValue,
  profileStateTogg,
  profileStateValue,
  CalendarStateValue,
} from "../../../../redux/CalendarSlice";

import { TaskInfoTaskValue } from "../../../../redux/TaskInfoSlice";
import {
  labelContStateTogg,
  labelContStateValue,
} from "../../../../redux/labelContSlice";

function List({ unassignM }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectname, tabid } = useParams();
  const pageName = window.location.pathname.split("/");
  const [assignView, setAssignView] = useState("");
  const [labelView, setLabelView] = useState("");
  const [calendarView, setCalendarView] = useState("");
  const domainSwitch = useSelector((state) => state.domainTask);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const CalendarStateBValue = useSelector((state) => state.CalendarStateB);
  const projectNameValue = useSelector((state) => state.ProjectNameB);
  const labelContValue = useSelector((state) => state.labelContB);
  const TaskInfoStateValue = useSelector((state) => state.TaskInfoStateB);
  const [userAssign, setuserAssign] = useState(false);
  const [userLabel, setuserLabel] = useState(false);
  const [editLabelState, seteditLabelState] = useState(false);
  const [labelEditedConfirm, setlabelEditedConfirm] = useState(false);
  const [startDateTogg, setStartDateTogg] = useState(false);
  const [endDateTogg, setEndDateTogg] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [labelDetails, setLabelDetails] = useState({
    name: "",
    value: "",
  });
  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const [myTaskState, setmyTaskState] = useState(
    myTaskStateValue
      ? myTaskStateValue.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )?.cards
      : []
  );
  /////////////////////////////   Update Complete connectivity in My Task Function.....

  function updatedTaskFunc(updatedData) {
    let targetTitle =
      pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1);

    async function myTaskFunc(ticket, updatedData) {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

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
      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
        console.log("dajshdashd");
      }
    }
    myTaskFunc(targetTitle, updatedData);
  }
  /////////////////////////////   Update Complete My Task  function.....

  ///////////////////////////////////////////  3   :----   Status
  const [selectedValues3, setSelectedValues3] = useState([]);
  const [selectedDropdownIndex3, setSelectedDropdownIndex3] = useState(null);
  const [dropdownState3, setDropdownState3] = useState([]);
  const [toggstate3, settoggstate3] = useState(false);

  const handleOptionSelect3 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues3((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption(option) };

      let updateArray = [...myTaskStateValue];
      const updatedTask = updateArray.map((task) => {
        if (
          task.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (ind === index) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  status: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });
      const updatedTask1 = updatedTask.map((task) => {
        if (task.title === "All") {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (card._id === TargetedTicketTask) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  status: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });

      dispatch(myTaskDataAction(updatedTask1));

      updatedTaskFunc(updatedTask1);
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
  ///////////////////////////////////////////  6   :---  Tags
  const [selectedValues6, setSelectedValues6] = useState([]);
  const [selectedDropdownIndex6, setSelectedDropdownIndex6] = useState(null);
  const [dropdownState6, setDropdownState6] = useState([]);
  const [toggstate6, settoggstate6] = useState(false);

  const handleOptionSelect6 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues6((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption3(option) };

      let updateArray = [...myTaskStateValue];
      const updatedTask = updateArray.map((task) => {
        if (
          task.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (ind === index) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  tag: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });
      const updatedTask1 = updatedTask.map((task) => {
        if (task.title === "All") {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (card._id === TargetedTicketTask) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  tag: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });
      dispatch(myTaskDataAction(updatedTask1));

      updatedTaskFunc(updatedTask1);
      return newValues;
    });
    setDropdownState6((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate6(false);
  };
  const getImageForOption3 = (option) => {
    switch (option) {
      case "tag":
        return tag;

      case "redTag":
        return redTag;
      case "greenTag":
        return greenTag;
      default:
        return tag;
    }
  };
  ////////////////////////////////////////////   4 :-----  Priority
  const [selectedValues4, setSelectedValues4] = useState([]);
  const [selectedDropdownIndex4, setSelectedDropdownIndex4] = useState(null);
  const [dropdownState4, setDropdownState4] = useState([]);
  const [toggstate4, settoggstate4] = useState(false);

  const handleOptionSelect4 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues4((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption1(option) };

      let updateArray = [...myTaskStateValue];
      const updatedTask = updateArray.map((task) => {
        if (
          task.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (ind === index) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  priority: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });
      const updatedTask1 = updatedTask.map((task) => {
        if (task.title === "All") {
          return {
            ...task,
            cards: task.cards.map((card, ind) => {
              if (card._id === TargetedTicketTask) {
                TargetedTicketTask = card._id;
                return {
                  ...card,
                  priority: newValues[index].value,
                };
              }
              return card;
            }),
          };
        }
        return task;
      });

      dispatch(myTaskDataAction(updatedTask1));

      updatedTaskFunc(updatedTask1);
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

  function handleDragStart(e, data) {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }
  ////////////////////////////////////   Update myTaskState List

  useEffect(() => {
    setmyTaskState(
      myTaskStateValue
        ? myTaskStateValue.find(
            (ele) =>
              ele.title ==
              pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
          )?.cards
        : []
    );
  }, [myTaskStateValue, window.location.pathname]);

  ////////////////////////////////////   Staus, priority, Tags

  useEffect(() => {
    setSelectedValues3(
      myTaskStateValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )
        ?.cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption(ele.status),
          value: ele.status,
        }))
    );

    setDropdownState3(
      myTaskStateValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )
        ?.cards.map(() => false)
    );
    setSelectedValues6(
      myTaskStateValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )
        ?.cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption3(ele.tag),
          value: ele.tag,
        }))
    );

    setDropdownState6(
      myTaskStateValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )
        ?.cards.map(() => false)
    );
    setSelectedValues4(
      myTaskStateValue &&
        myTaskStateValue
          ?.find(
            (ele) =>
              ele.title ==
              pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
          )
          ?.cards.map((ele) => ele)
          .map((ele, ind) => ({
            image: getImageForOption1(ele.priority),
            value: ele.priority,
          }))
    );

    setDropdownState4(
      myTaskStateValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        )
        ?.cards.map(() => false)
    );
  }, [myTaskStateValue, window.location.pathname]);

  //////////////////////////    Assign Member in Assignees Function

  // async function AddAssigMem(element) {
  //   function updateCalender(element) {
  //     let updatedDate = myTaskStateValue.map((ele) => {
  //       if (
  //         ele.title ===
  //         pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
  //       ) {
  //         return {
  //           ...ele,
  //           cards: ele.cards.map((task) => {
  //             if (task._id === CalendarStateBValue.otherValue.targetId) {
  //               return {
  //                 ...task,
  //                 assignMem: [...task.assignMem, element],
  //               };
  //             }
  //             return task;
  //           }),
  //         };
  //       } else if (ele.title === "All") {
  //         return {
  //           ...ele,
  //           cards: ele.cards.map((task) => {
  //             if (task._id === CalendarStateBValue.otherValue.targetId) {
  //               return {
  //                 ...task,
  //                 assignMem: [...task.assignMem, element],
  //               };
  //             }
  //             return task;
  //           }),
  //         };
  //       }
  //       return ele;
  //     });
  //     dispatch(myTaskDataAction(updatedDate));
  //     updatedTaskFunc(updatedDate);
  //   }
  //   if (CalendarStateBValue.otherValue.targetId != "" && pageName[5] != "all") {
  //     updateCalender(element);
  //   }
  // }

  //////////////////////////   Add Labels  Function  :- Feature , Bugs etc..

  async function AdduserLabel(element, AddorRemove) {
    function updateCalender(element, AddorRemove) {
      let updatedData;
      if (AddorRemove) {
        updatedData = myTaskStateValue.map((ele) => {
          if (
            ele.title ===
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((task) => {
                if (task._id === CalendarStateBValue.labelValue.targetId) {
                  return {
                    ...task,
                    labels: task.labels.filter((ele, ind) => {
                      if (ele.name != element.name) return true;
                    }),
                  };
                }
                return task;
              }),
            };
          } else if (ele.title === "All") {
            return {
              ...ele,
              cards: ele.cards.map((task) => {
                if (task._id === CalendarStateBValue.labelValue.targetId) {
                  return {
                    ...task,
                    labels: task.labels.filter((ele, inf) => {
                      if (ele.name != element.name) return true;
                    }),
                  };
                }
                return task;
              }),
            };
          }
          return ele;
        });
      } else {
        updatedData = myTaskStateValue.map((ele) => {
          if (
            ele.title ===
            pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((task) => {
                if (task._id === CalendarStateBValue.labelValue.targetId) {
                  return {
                    ...task,
                    labels: [
                      ...task.labels,
                      {
                        name: element.name,
                        value: element.value,
                        status: "labeltick",
                      },
                    ],
                  };
                }
                return task;
              }),
            };
          } else if (ele.title === "All") {
            return {
              ...ele,
              cards: ele.cards.map((task) => {
                if (task._id === CalendarStateBValue.labelValue.targetId) {
                  return {
                    ...task,
                    labels: [
                      ...task.labels,
                      {
                        name: element.name,
                        value: element.value,
                        status: element.status,
                      },
                    ],
                  };
                }
                return task;
              }),
            };
          }
          return ele;
        });
      }
      dispatch(myTaskDataAction(updatedData));
      updatedTaskFunc(updatedData);
    }
    if (CalendarStateBValue.labelValue.targetId != "" && pageName[5] != "all") {
      updateCalender(element, AddorRemove);
    }
  }

  ///////////////////////////////////////  Self Update Calendar
  useEffect(() => {
    function updateCalender() {
      let updatedDate = myTaskStateValue.map((ele) => {
        if (
          ele.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((task) => {
              if (task._id === CalendarStateBValue.targetId) {
                return {
                  ...task,
                  start: CalendarStateBValue.value.start,
                  end: CalendarStateBValue.value.end,
                };
              }
              return task;
            }),
          };
        }
        else if(
          ele.title === "All"
        ){
          return {
            ...ele,
            cards: ele.cards.map((task) => {
              if (task._id === CalendarStateBValue.targetId) {
                return {
                  ...task,
                  start: CalendarStateBValue.value.start,
                  end: CalendarStateBValue.value.end,
                };
              }
              return task;
            }),
          };
        }

        return ele;
      });
      dispatch(myTaskDataAction(updatedDate));
      updatedTaskFunc(updatedDate);
    }

    if (CalendarStateBValue.targetId != "" && pageName[5] != "all") {
      updateCalender();
    }
  }, [CalendarStateBValue.value]);

  //////////////////////////////////////////  Handle Calendar Date Changes

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };
  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  /////////////////////  Calendar Click Outside
  const calendarRef = useRef(null);
  const tagRef = useRef(null);
  const labelRef = useRef(null);
  const createlabelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setStartDate(null);
        setEndDate(null);
        dispatch(CalendarStateTogg(false));
      } else if (tagRef.current && !tagRef.current.contains(event.target)) {
        settoggstate6(false);
      } else if (labelRef.current && !labelRef.current.contains(event.target)) {
        setuserLabel(false);
      } else if (
        createlabelRef.current &&
        !createlabelRef.current.contains(event.target)
      ) {
        seteditLabelState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
        {myTaskState &&
          myTaskState.map((ele, ind) => {
            const isDropdownOpen3 =
              selectedDropdownIndex3 === ind && dropdownState3[ind];
            const isDropdownOpen4 =
              selectedDropdownIndex4 === ind && dropdownState4[ind];
            const isDropdownOpen6 =
              selectedDropdownIndex6 === ind && dropdownState6[ind];

            return (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "6.7rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                     
                  }}
              

                  // onDoubleClick={() => {
                  //   dispatch(
                  //     domainNameUpdate({ name: ele.name, domainId: ele.id,domainName:pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1) })
                  //   );
                  //   dispatch(domainTaskTogg());
                  //   navigate(`/home/${projectname}/workspace/Domains/${pageNavName}/list/all`);
                  // }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                    id={ind}
                  >
                    <div
                      id={ind}
                      onClick={() => {
                        settoggstate3(true);
                        setSelectedDropdownIndex3(ind);
                        setDropdownState3((prevState) => {
                          const newState = [...prevState];
                          newState[ind] = !newState[ind];
                          return newState;
                        });
                      }}
                      style={{
                        maxWidth: "2.5rem",
                      }}
            
                    >
                      <img
                        src={selectedValues3[ind]?.image}
                        alt=""
                        style={{ width: "1.5rem", height: "1.5rem" }}
                  
                      />
                    </div>
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
                      {toggstate3 && isDropdownOpen3 && (
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
                              onClick={() =>
                                handleOptionSelect3(option.value, ind)
                              }
                              style={{
                                display: "flex",
                                gap: "1rem",
                                backgroundColor:
                                  "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                              }}
                            >
                              <img
                                src={getImageForOption(option.value)}
                                alt=""
                              />
                              <span style={{ fontSize: "1.2rem" }}>
                                {option.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div
                      id={ind}
                      onClick={() => {
                        settoggstate4(true);
                        setSelectedDropdownIndex4(ind);
                        setDropdownState4((prevState) => {
                          const newState = [...prevState];
                          newState[ind] = !newState[ind];
                          return newState;
                        });
                      }}
                      className={styled.selectableDrop}
                    >
                      <img
                        src={selectedValues4[ind]?.image}
                        alt=""
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    </div>

                    <div className={styled.priorityMainContainer}>
                      {toggstate4 && isDropdownOpen4 && (
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
                            if (ele.priority) {
                              return (
                                <li
                                  key={option.value}
                                  onClick={() =>
                                    handleOptionSelect4(option.value, ind)
                                  }
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
                            } else {
                              return (
                                <li
                                  key={option.value}
                                  onClick={() =>
                                    handleOptionSelect4(option.value, ind)
                                  }
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
                    <div
                      style={{
                        margin: "0rem 1.5rem",
                        fontSize: "1.8rem",
                        minWidth: "7rem",
                      }}
                      onClick={() => {
                        if (pageName[5] != "all") {
                          dispatch(TaskInfoTaskValue(ele));
                          navigate(
                            `/home/${projectname}/${tabid}/mytask/${pageName[5]}/${ele.name}/Overview`
                          );
                        }
                      }}

                      draggable={pageName[5] !== "all"}
                  onDragStart={(e) => {
                    if (pageName[5] === "all") {
                      return;
                    }
                    e.target.style.opacity = 0.5;
                    // e.target.style.width = "10rem";
                    // e.target.style.overflow = "hidden";
                    handleDragStart(e, ele);
                  }}
                  onDrag={(e) => {
                    // e.target.style.opacity = 0.8;
                  }}
                  onDragEnd={(e) => {
                    if (pageName[5] === "all") {
                      return;
                    }
                    e.target.style.opacity=1;
                    // e.target.style.width = "100%";
                    // e.target.style.opacity = 1;
                    // e.target.style.height = "6.7rem";
                    e.target.style.display = "flex";
                    // e.target.style.justifyContent = "space-between";
                    // e.target.style.alignItems = "center";
                  }}
                    >
                      {ele.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        maxWidth: "31rem",
                      }}
                    >
                      <div style={{ marginTop: ".6rem" }}>
                        <img src={rightarrow} alt="sdahs" />
                      </div>
                      <div
                        style={{
                          margin: "0rem 1.5rem",
                          fontSize: "1.4rem",
                          overflow: "scroll",
                          maxWidth: "26rem",
                          width: "26rem",
                          maxHeight: "2rem",
                        }}
                      >
                        {/* <div> */}
                        {ele.desc}

                        {/* </div> */}
                      </div>
                    </div>
                    <div
                      style={{ margin: "0rem 1.5rem" }}
                      className={styled.semiCircle1}
                    >
                      <span
                        style={{
                          width: ".8rem",
                          height: ".8rem",
                          borderRadius: ".5rem",
                          border: ".3px solid ",
                        }}
                      ></span>
                      <span>
                        {
                          ele.tasks[0]?.subtask.filter((ele, ind) => {
                            if (ele.status === "Done") {
                              return ele;
                            }
                          }).length
                        }
                        /{ele.tasks[0]?.subtask.length}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          marginRight: "1rem",
                          height: ".5rem",
                          width: "6rem",
                          border: ".5px solid #fff",
                          backgroundColor: "#fff",
                          borderRadius: ".8rem",
                          marginTop: ".1rem",
                          position: "relative",
                        }}
                      >
                      {console.log("weuyw435",Math.round(
                                    (
                                      (ele.tasks[0].subtask.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0].subtask.length) *
                                      100
                                    ).toFixed(2)))}
                        <div
                          className={styled.Listpercentage}
                          style={{
                            width:
                              ele.tasks[0]?.subtask.length > 0
                                ? `${Math.round(
                                    (
                                      (ele.tasks[0].subtask.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0].subtask.length) *
                                      100
                                    ).toFixed(2)
                                  )}%`
                                : "0%",
                                backgroundColor:Math.round(
                                    (
                                      (ele.tasks[0].subtask.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0].subtask.length) *
                                      100
                                    ).toFixed(2)) > 70?"#FA4F57":Math.round(
                                    (
                                      (ele.tasks[0].subtask.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0].subtask.length) *
                                      100
                                    ).toFixed(2)) < 30?"#3CD8FA":"#F4B507"

                          }}
                        ></div>
                      </div>
                      <div style={{ fontSize: "1.2rem" }}>
                        {ele.tasks[0]?.subtask.length > 0
                          ? `${Math.round(
                              (
                                (ele.tasks[0].subtask.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length /
                                  ele.tasks[0].subtask.length) *
                                100
                              ).toFixed(2)
                            )}%`
                          : "0%"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{ marginRight: "3rem", position: "relative" }}
                      onClick={() => {
                        setCalendarView(ind);

                        dispatch(
                          CalendarStateTogg({
                            stateValue: true,
                            Id: ele._id,
                          })
                        );
                      }}
                    >
                      <img src={DateSvg} alt="sdahs" />
                      {CalendarStateBValue.calendarState &&
                      calendarView == ind ? (
                        <div
                          className={styled.calendarContainer}
                          ref={calendarRef}
                          // onClick={(e)=>{
                          //   e.stopPropagation()
                          // }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              className={styled.calendarTop}
                              onClick={() => {
                                setStartDateTogg(!startDateTogg);
                              }}
                            >
                              {startDateTogg ? "" : <span>Start date</span>}
                              {/* <input type="date" value={startDate?.toISOString().substr(0, 10)} onChange={handleStartDateChange}  style={{backgroundColor:"transparent"}}/> */}
                              <input
                                type="date"
                                value={
                                  startDate
                                    ? startDate.toISOString().substr(0, 10)
                                    : ""
                                }
                                onChange={handleStartDateChange}
                                style={{
                                  backgroundColor: "transparent",
                                  display: `${
                                    startDateTogg ? "block" : "none"
                                  }`,
                                  fontSize: "1.1rem",
                                }}
                              />
                            </div>
                            <div
                              className={styled.calendarTop}
                              onClick={() => {
                                setEndDateTogg(!endDateTogg);
                              }}
                            >
                              {endDateTogg ? "" : <span>End date</span>}

                              {/* <input type="date" value={endDate?.toISOString().substr(0, 10)} onChange={handleEndDateChange} /> */}
                              <input
                                type="date"
                                value={
                                  endDate
                                    ? endDate.toISOString().substr(0, 10)
                                    : ""
                                }
                                onChange={handleEndDateChange}
                                style={{
                                  backgroundColor: "transparent",
                                  display: `${endDateTogg ? "block" : "none"}`,
                                  fontSize: "1.1rem",
                                }}
                              />
                            </div>
                          </div>
                          <Calendar
                            selectRange={true}
                            value={[startDate, endDate]}
                            className={styled.calendarBackground}
                            onChange={(dates) => {
                              setStartDate(dates[0]);
                              setEndDate(dates[1]);
                              const formattedDate = `${dates[0].getFullYear()}-${(dates[0].getMonth() + 1).toString().padStart(2, '0')}-${dates[0].getDate().toString().padStart(2, '0')}`;
                              const formattedDate1 = `${dates[1].getFullYear()}-${(dates[1].getMonth() + 1).toString().padStart(2, '0')}-${dates[1].getDate().toString().padStart(2, '0')}`;

                              console.log(
                                "Selected range:",
                                dates[0],
                                "-",
                                dates[1]
                              );
                              dispatch(
                                CalendarStateValue({
                                  start: formattedDate,
                                  end: formattedDate1,
                                })
                              );
                            }}
                            formatShortWeekday={(locale, value) => {
                              const weekdays = [
                                "SUN",
                                "MON",
                                "TUE",
                                "WED",
                                "THU",
                                "FRI",
                                "SAT",
                              ];
                              return weekdays[value.getDay()].charAt(0);
                            }}
                            tileClassName={({ date, view }) =>
                              view === "month" &&
                              (date.getDay() === 0 || date.getDay() === 6)
                                ? "weekend "
                                : ""
                            }
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <div></div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "6rem",
                                height: "2.5rem",
                                border: "1px solid #413E3E",
                                borderRadius: "2rem",
                                fontSize: "1.2rem",
                                justifyContent: "center",
                              }}
                              onClick={() => {
                                setStartDate(new Date());
                                setEndDate(new Date());
                              }}
                            >
                              <div>Clear</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        id={ind}
                        onClick={() => {
                          settoggstate6(true);
                          setSelectedDropdownIndex6(ind);
                          setDropdownState6((prevState) => {
                            const newState = [...prevState];
                            newState[ind] = !newState[ind];
                            return newState;
                          });
                        }}
                        style={{
                          maxWidth: "2.5rem",
                          position: "relative",
                        }}
                      >
                        <img
                          src={selectedValues6[ind]?.image}
                          alt=""
                          style={{ width: "2rem", height: "2rem" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            width: "5rem",
                            top: "125%",
                            right: "-20%",
                            zIndex: 20,
                            backgroundColor:
                              "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                            backdropFilter: "blur(6px)",
                            borderRadius: ".5rem",
                          }}
                        >
                          {toggstate6 && isDropdownOpen6 && (
                            <ul
                              className={styled.priorityContainer}
                              style={{ minWidth: "1.7rem" }}
                              ref={tagRef}
                            >
                              {[
                                { value: "tag" },
                                { value: "redTag" },
                                { value: "greenTag" },
                              ].map((option) => (
                                <li
                                  key={option.value}
                                  onClick={() =>
                                    handleOptionSelect6(option.value, ind)
                                  }
                                  style={{
                                    display: "flex",
                                    width: "1.7rem",

                                    gap: "1rem",
                                    backgroundColor:
                                      "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                                  }}
                                >
                                  <img
                                    src={getImageForOption3(option.value)}
                                    alt=""
                                    style={{ width: "2rem", height: "2rem" }}
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* ///////////////////////////////////////////////  Labels */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "2rem",
                          marginLeft: "2rem",
                          maxWidth: "22rem",
                          overflow: "scroll",
                        }}
                      >
                        {ele.labels.map((labelEle) => {
                          return (
                            <div
                              className={styled.semiCircle3}
                              onClick={() => {
                                const newTask1 = [];
                                ele.labels.forEach((task2Item) => {
                                  const matchingTask1Item =
                                    labelContValue.value.find(
                                      (task1Item) =>
                                        task1Item.name === task2Item.name
                                    );
                                  if (matchingTask1Item) {
                                    newTask1.push(matchingTask1Item);
                                  }
                                });
                                labelContValue.value.forEach((task1Item) => {
                                  const isAlreadyAdded = newTask1.find(
                                    (newTask1Item) =>
                                      newTask1Item.name === task1Item.name
                                  );
                                  if (!isAlreadyAdded) {
                                    newTask1.push(task1Item);
                                  }
                                });
                                dispatch(labelContStateValue(newTask1));

                                dispatch(
                                  labelStateTogg({
                                    stateValue: true,
                                    Id: ele._id,
                                  })
                                );
                                setLabelView(ind);
                                setuserLabel(!userLabel);
                              }}
                            >
                              <span
                                style={{
                                  height: ".6rem",
                                  width: ".6rem",
                                  borderRadius: ".3rem",
                                  backgroundColor: `${labelEle.value}`,
                                }}
                              ></span>
                              <span>{labelEle.name}</span>
                            </div>
                          );
                        })}
                      </div>
                      {/* /////////////////////////////////////////////// */}
                    </div>
                    <div>
                      <div style={{ display: "flex", position: "relative" }}>
                        {/* <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setAssignView(ind);
                            setuserAssign(!userAssign);
                            dispatch(
                              profileStateTogg({
                                stateValue: true,
                                Id: ele._id,
                              })
                            );
                          }}
                        >
                          <img src={profile} alt="sdahs" />
                        </div> */}
                        <div style={{ marginLeft: "3rem", fontSize: "1.2rem" }}>
                          {ele.date}
                        </div>
                      </div>
                      {/* {userAssign && assignView == ind ? (
                    <div className={styled.userAssignContainer}>
                      {myTaskStateValue
                            .find((ele, ind) => {
                              if (
                                ele.title ==
                                pageName[5].charAt(0).toUpperCase() +
                                  pageName[5].slice(1)
                              )
                                return ele;
                            })?.cards.find((ele, ind) => {
                              if (
                                ele._id ==
                                CalendarStateBValue.otherValue.targetId
                              )
                                return ele;
                            })
                            .assignMem.length>=1?
                            <>
                            <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: ".8rem",
                          color: "#B1A9A9",
                        }}
                      >
                        <div>Assigned to...</div>
                        <div
                          style={{
                            width: "1.4rem",
                            height: "1.2rem",
                            border: "1px solid #413E3E",
                            fontWeight: "bolder",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: ".3rem",
                            padding: ".7rem",
                          }}
                        >
                          A
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: ".5px solid #413E3E",
                          margin: "1rem 0rem",
                          fontSize: "1.4rem",
                        }}
                      ></div>
                      </>
                      :""}
                    

                      <div className={styled.assignSection}>
                        {CalendarStateBValue.otherValue.targetId !== "" &&
                          myTaskStateValue
                            .find((ele, ind) => {
                              if (
                                ele.title ==
                                pageName[5].charAt(0).toUpperCase() +
                                  pageName[5].slice(1)
                              )
                                return ele;
                            })
                            .cards.find((ele, ind) => {
                              if (
                                ele._id ==
                                CalendarStateBValue.otherValue.targetId
                              )
                                return ele;
                            })
                            .assignMem.map((ele, ind) => {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "1rem",
                                    cursor: "pointer",
                                  }}
                                  key={ind}
                                  onClick={() => {
                                    dispatch(profileStateValue(ele));
                                    AddAssigMem(ele);
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "2rem",
                                        height: "2rem",
                                        borderRadius: "1rem",
                                        border: "1px solid #7f7575",
                                      }}
                                    ></div>
                                    <div
                                      style={{
                                        fontSize: "1.2rem",
                                        color: "#fff",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      {ele.memberName}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: ".5rem",
                                      height: ".5rem",
                                      borderRadius: ".3rem",
                                      backgroundColor: "green",
                                    }}
                                  ></div>
                                </div>
                              );
                            })}
                      </div>
                      <div
                        style={{
                          fontSize: ".8rem",
                          color: "#B1A9A9",
                          marginTop: "1rem",
                        }}
                      >
                        Unassigned
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: ".5px solid #413E3E",
                          margin: "1rem 0rem",
                          fontSize: "1.4rem",
                        }}
                      ></div>
                      <div className={styled.unassignedSection}>
                        {unassignM.map((ele, ind) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "1rem",
                                cursor: "pointer",
                              }}
                              key={ind}
                              onClick={() => {
                                dispatch(profileStateValue(ele));
                                let targetedObb = ele;
                                let card = myTaskStateValue
                                  .find(
                                    (task) =>
                                      task.title ===
                                      pageName[5].charAt(0).toUpperCase() +
                                        pageName[5].slice(1)
                                  )
                                  ?.cards.find(
                                    (card) =>
                                      card._id ===
                                      CalendarStateBValue.otherValue.targetId
                                  );

                                let isTargetedObbIncluded =
                                  card?.assignMem.some(
                                    (obj) =>
                                      JSON.stringify(obj) ===
                                      JSON.stringify(targetedObb)
                                  );
                                if (!isTargetedObbIncluded) {
                                  AddAssigMem(ele);
                                }
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "2rem",
                                    height: "2rem",
                                    borderRadius: "1rem",
                                    border: "1px solid #7f7575",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    fontSize: "1.2rem",
                                    color: "#fff",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  {ele.memberName}
                                </div>
                              </div>
                              <div
                                style={{
                                  width: ".5rem",
                                  height: ".5rem",
                                  borderRadius: ".3rem",
                                  backgroundColor: "green",
                                }}
                              ></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                       */}
                    </div>
                  </div>

                  {/* ////////////////////////////////////    Labels   */}

                  {userLabel && labelView == ind ? (
                    <div className={styled.labelContainer} ref={labelRef}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{ fontSize: "1.2rem" }}
                          onClick={() => {
                            seteditLabelState(!editLabelState);
                            setuserLabel(false);
                          }}
                        >
                          New label
                        </div>
                        <div
                          style={{
                            width: "1.4rem",
                            height: "1.2rem",
                            color: "#fff",
                            border: "1px solid #413E3E",
                            fontWeight: "bolder",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: ".3rem",
                            padding: ".7rem",
                          }}
                        >
                          L
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          border: ".5px solid #413E3E",
                          margin: "1rem 0rem",
                          fontSize: "1.4rem",
                        }}
                      ></div>

                      <div style={{ maxHeight: "12.5rem", overflow: "scroll" }}>
                        {labelContValue.value.map((labelEle, ind) => {
                          const isLabelPresent = ele.labels.some(
                            (eleState) => eleState.name === labelEle.name
                          );
                          return (
                            <div
                              className={styled.labelContainerflex}
                              onClick={() => {
                                dispatch(labelStateValue(labelEle));
                                AdduserLabel(
                                  labelEle,
                                  ele.labels.some(
                                    (ele) => ele.name === labelEle.name
                                  )
                                );
                                setuserLabel(false);
                              }}
                            >
                             <div style={{minWidth:"2rem",minHeight:"1.5rem",marginTop:".5rem"}}>

{isLabelPresent ? (
<img
 src={labeltick}
 alt="dsdds"
 style={{ marginLeft: ".4rem" }}
/>
) : (
<img
 src={labeluntick}
 alt="dsdds"
 className={styled.labelContainerimage}
/>
)}
</div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: "1rem",
                                }}
                              >
                                <div
                                  style={{
                                    width: ".6rem",
                                    height: ".6rem",
                                    borderRadius: ".3rem",
                                    backgroundColor: `${labelEle.value}`,
                                  }}
                                ></div>

                                <div
                                  style={{
                                    fontSize: "1.2rem",
                                    marginLeft: "1rem",
                                  }}
                                >
                                  {labelEle.name}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* /////////// Add Labels   */}

                  {editLabelState && labelView == ind ? (
                    <div
                      className={styled.newLableConatiner}
                      ref={createlabelRef}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (
                            labelDetails.name !== "" &&
                            labelDetails.value !== ""
                          ) {
                            async function AddLabels() {
                              const tokenObject = JSON.parse(
                                localStorage.getItem("userToken")
                              );

                              let res = await fetch(
                                `http://localhost:8000/user/Labels`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    source: "manual",
                                    tokenData: {
                                      token: tokenObject.tokenGen,
                                      project: pageName[2],
                                      newLabel: true,
                                    },
                                    labelDetail: labelDetails,
                                  }),
                                }
                              );
                              let data = await res.json();

                              if (data.status == 422)
                                console.log("Error to insert in MyTask");
                              else {
                                dispatch(labelContStateTogg());
                                seteditLabelState(false);
                                setlabelEditedConfirm(!labelEditedConfirm);
                              }
                            }
                            AddLabels();
                          }
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: ".8rem",
                            color: "#B1A9A9",
                          }}
                        >
                          <div>
                            <input
                              type="text"
                              placeholder="write label name"
                              defaultValue={labelDetails.name}
                              className={styled.newLableConatinerInput}
                              name="name"
                              onChange={(e) => {
                                setLabelDetails({
                                  ...labelDetails,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              autoFocus
                            />
                          </div>
                          <div
                            style={{
                              width: "1.4rem",
                              height: "1.2rem",
                              border: "1px solid #413E3E",
                              fontWeight: "bolder",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: ".3rem",
                              padding: ".7rem",
                            }}
                          >
                            L
                          </div>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            border: ".5px solid #413E3E",
                            margin: "1rem 0rem",
                            fontSize: "1.4rem",
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          {[
                            "#FA4F57",
                            "#263F56",
                            "#055FFC",
                            "#0EC478",
                            "#F4B507",
                            "#9747FF",
                            "#B9BBBE",
                          ].map((ele, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  width: "1.6rem",
                                  height: "1.6rem",
                                  borderRadius: "1rem",
                                  backgroundColor: `${ele}`,
                                  border: `${
                                    clickedIndex === index
                                      ? "1px solid #fff"
                                      : ""
                                  }`,
                                }}
                                onClick={(e) => {
                                  handleClick(index);
                                  setLabelDetails({
                                    ...labelDetails,
                                    value: ele,
                                  });
                                }}
                              ></div>
                            );
                          })}
                        </div>
                        <button className={styled.labelButton}>
                          <div>+</div>
                          <div>Create label</div>
                        </button>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className={styled.branch_line1}>
                  <div style={{ border: ".25px solid #413E3E" }}></div>
                </div>
              </>
            );
          })}
        {/* //////////  Assignee  */}
        {/* <div style={{width:".6rem",height:".6rem",borderRadius:".3rem",backgroundColor:`${ele.value}`}}></div> */}
      </div>
    </>
  );
}

export default List;
