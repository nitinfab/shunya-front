import React, { useEffect, useState } from "react";

import rightarrow from "../../../../assets/rightarrow.svg";
import tag from "../../../../assets/tag.svg";
import profile from "../../../../assets/profile.svg";
import To_do from "../../../../assets/todoS.svg";
import In_Progress from "../../../../assets/progS.svg";
import Done from "../../../../assets/doneS.svg";
import Backlog from "../../../../assets/backS.svg";
import Urgent from "../../../../assets/urgentPrio.svg";
import Mid from "../../../../assets/midPrio.svg";
import Low from "../../../../assets/lowPrio.svg";
import High from "../../../../assets/highPrio.svg";
import unmark from "../../../../assets/unmark.svg";
import tickmark from "../../../../assets/tickmark.svg";
import cross from "../../../../assets/cross.svg";
import DateSvg from "../../../../assets/Date.svg";
import styled from "../../../BranchPages/WorkSpacePages/DomainPages/DomainPageStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { myTaskDataAction } from "../../../../redux/myTaskSlice";
import { CalendarStateTogg } from "../../../../redux/CalendarSlice";
import { TaskInfoTaskValue } from "../../../../redux/TaskInfoSlice";

function DomainTaskSub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectname, tabid } = useParams();
  const pageName = window.location.pathname.split("/");
  const domainSwitch = useSelector((state) => state.domainTask);
  const TaskInfoStateValue = useSelector((state) => state.TaskInfoStateB);
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const TaskInfoValue = useSelector((state) => state.TaskInfoStateB);
  const workspaceDataValue = useSelector((state) => state.workspaceDataB);

  const [myTaskState, setmyTaskState] = useState(
    workspaceDataValue
      ? workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })?.tasks[0].subtask
      : []
  );
  const [myTaskState1, setmyTaskState1] = useState(
    workspaceDataValue
      ? workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })?.tasks[0].subtask
      : []
  );

  ///////////////////////////////////////////  3
  const [selectedValues3, setSelectedValues3] = useState([]);
  const [selectedDropdownIndex3, setSelectedDropdownIndex3] = useState(null);
  const [dropdownState3, setDropdownState3] = useState([]);
  const [toggstate3, settoggstate3] = useState(false);

  const handleOptionSelect3 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues3((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption(option) };

      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray.map((ele, ind) => {
        if (
          ele.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card, cardIndex) => {
              if (card._id === TaskInfoValue.taskInfoTask._id) {
                return {
                  ...card,
                  tasks: card?.tasks.map((task, taskIndex) => {
                    return {
                      ...task,
                      subtask: task.subtask.map((subtask, subtaskIndex) => {
                        if (subtaskIndex === index) {
                          return {
                            ...subtask,
                            status: newValues[index].value,
                          };
                        } else {
                          return subtask;
                        }
                      }),
                    };
                  }),
                };
              } else {
                return card;
              }
            }),
          };
        } else {
          return ele;
        }
      });
      console.log("hasgd3423",updatedTask)
      //   dispatch(myTaskDataAction(updatedTask));

      //   updatedTaskFunc(updatedTask);
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

  const handleOptionSelect4 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues4((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption1(option) };

      let updateArray = [...workspaceDataValue];

      const updatedTask = updateArray.map((ele, ind) => {
        if (
          ele.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card, cardIndex) => {
              if (card._id === TaskInfoValue.taskInfoTask._id) {
                return {
                  ...card,
                  tasks: card?.tasks.map((task, taskIndex) => {
                    return {
                      ...task,
                      subtask: task.subtask.map((subtask, subtaskIndex) => {
                        if (subtaskIndex === index) {
                          return {
                            ...subtask,
                            priority: newValues[index].value,
                          };
                        } else {
                          return subtask;
                        }
                      }),
                    };
                  }),
                };
              } else {
                return card;
              }
            }),
          };
        } else {
          return ele;
        }
      });

      //   dispatch(myTaskDataAction(updatedTask));

      //   updatedTaskFunc(updatedTask);
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
  ////////////////////////////////////////////   5
  //   const [markState,setMarkState]=useState({ value: "unmark", image: getImageForOption2("unmark") })
  const [selectedValues5, setSelectedValues5] = useState([]);
  const [selectedDropdownIndex5, setSelectedDropdownIndex5] = useState(null);
  const [dropdownState5, setDropdownState5] = useState([]);
  const [toggstate5, settoggstate5] = useState(false);

  const handleOptionSelect5 = (option, index) => {
    setSelectedValues5((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption2(option) };

      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray.map((ele, ind) => {
        if (
          ele.title ===
          pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card, cardIndex) => {
              if (card._id === TaskInfoValue.taskInfoTask._id) {
                return {
                  ...card,
                  tasks: card?.tasks.map((task, taskIndex) => {
                    return {
                      ...task,
                      subtask: task.subtask.map((subtask, subtaskIndex) => {
                        if (subtaskIndex === index) {
                          return {
                            ...subtask,
                            markStatus: newValues[index].value,
                          };
                        } else {
                          return subtask;
                        }
                      }),
                    };
                  }),
                };
              } else {
                return card;
              }
            }),
          };
        } else {
          return ele;
        }
      });

      //   dispatch(myTaskDataAction(updatedTask));
      //   updatedTaskFunc(updatedTask);

      return newValues;
    });

    setDropdownState5((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate5(false);
  };

  const getImageForOption2 = (option) => {
    switch (option) {
      case "unmark":
        return unmark;
      case "tickmark":
        return tickmark;
      default:
        return unmark;
    }
  };
  ////////////////////////////////////   Staus

  function handleDragStart(e, data) {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }

  /////////////////////////////   Update function.....

  function updatedTaskFunc(updatedData) {
    let targetTitle =
      pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1);

    async function myTaskFunc(ticket, updatedData) {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

      res = await fetch(`http://localhost:8000/user/myTask/update/subtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenData: {
            token: tokenObject.tokenGen,
            project: tokenObject.projectName,
            kanbanData: {
              data: updatedData
                .find((ele, ind) => {
                  if (
                    ele.title ===
                    pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
                  )
                    return ele;
                })
                .cards.find((ele, ind) => {
                  if (ele._id == TaskInfoValue.taskInfoTask._id) return ele;
                })?.tasks[0].subtask,
              ticketName: ticket,
              taskNameId: TaskInfoValue.taskInfoTask._id,
            },
          },
        }),
      });
      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
      }
    }

    myTaskFunc(targetTitle, updatedData);
  }

  useEffect(() => {
    setmyTaskState(
      workspaceDataValue
        ? workspaceDataValue
            .find((ele, ind) => {
              if (
                ele.title ==
                pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
              ) {
                return ele;
              }
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == domainSwitch.domainId) {
                return ele;
              }
            })
            ?.tasks.find((ele, ind) => {
              if (
                ele.title ==
                pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
              ) {
                return ele;
              }
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
                return ele;
              }
            })?.tasks[0].subtask
        : []
    );
    setmyTaskState1(
      workspaceDataValue
        ? workspaceDataValue
            .find((ele, ind) => {
              if (
                ele.title ==
                pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
              ) {
                return ele;
              }
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == domainSwitch.domainId) {
                return ele;
              }
            })
            ?.tasks.find((ele, ind) => {
              if (
                ele.title ==
                pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
              ) {
                return ele;
              }
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
                return ele;
              }
            })?.tasks[0].subtask
        : []
    );
  }, [workspaceDataValue, window.location.pathname]);

  useEffect(() => {
    setSelectedValues3(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map((ele) => ele)
          .map((ele, ind) => ({
            image: getImageForOption(ele.status),
            value: ele.status,
          }))
    );

    setDropdownState3(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map(() => false)
    );
    setSelectedValues4(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map((ele) => ele)
          .map((ele, ind) => ({
            image: getImageForOption1(ele.priority),
            value: ele.priority,
          }))
    );

    setDropdownState4(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map(() => false)
    );
    /////////////////////////////////////

    setSelectedValues5(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map((ele) => ele)
          .map((ele, ind) => ({
            image: getImageForOption2(ele.markStatus),
            value: ele.markStatus,
          }))
    );

    setDropdownState5(
      workspaceDataValue &&
        workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) {
              return ele;
            }
          })
          ?.tasks.find((ele, ind) => {
            if (
              ele.title ==
              pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            ) {
              return ele;
            }
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == TaskInfoStateValue.taskInfoTask._id) {
              return ele;
            }
          })
          ?.tasks[0].subtask.map(() => false)
    );
  }, [workspaceDataValue, window.location.pathname]);

  return (
    <>
      <div style={{ maxHeight: "60%", height: "60%" }}>
        {myTaskState &&
          myTaskState.map((ele, ind) => {
            if (ele.markStatus == "unmark") {
              const isDropdownOpen3 =
                selectedDropdownIndex3 === ind && dropdownState3[ind];
              const isDropdownOpen4 =
                selectedDropdownIndex4 === ind && dropdownState4[ind];

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
                    }}
                    draggable={pageName[5] !== "all"}
                    onDragStart={(e) => {
                      handleDragStart(e, ele);
                      e.target.style.opacity = 0.5;
                      e.target.style.width = "10rem";
                      e.target.style.overflow = "hidden";
                    }}
                    onDrag={(e) => {
                      // e.target.style.opacity = 0.8;
                      // e.target.style.width = "10rem";
                      // e.target.style.overflow = "hidden";
                    }}
                    onDragEnd={(e) => {
                      e.target.style.width = "100%";
                      e.target.style.opacity = 1;
                      e.target.style.height = "6.7rem";
                      e.target.style.display = "flex";
                      e.target.style.justifyContent = "space-between";
                      e.target.style.alignItems = "center";
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
                        style={{
                          // maxWidth: "2.5rem",
                          marginRight: "1.5rem",
                        }}
                        onClick={() => {
                          if (ele.markStatus == "unmark") {
                            console.log("sjhdhd34343");
                            handleOptionSelect5("tickmark", ind);
                          } else {
                            console.log("dhhu42423432");
                            handleOptionSelect5("unmark", ind);
                          }
                        }}
                      >
                        <img
                          src={selectedValues5[ind]?.image}
                          alt="sads"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </div>
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
                          if (pageName[5] != "All") {
                            dispatch(TaskInfoTaskValue(ele));
                            navigate(
                              `/home/${projectname}/${tabid}/mytask/${pageName[5]}/${ele.name}/Overview`
                            );
                          }
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
                        <span>2</span>
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
                          <div className={styled.Listpercentage}></div>
                        </div>
                        <div style={{ fontSize: "1.2rem" }}>40%</div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div
                        style={{ marginRight: "3rem" }}
                        onClick={() => {
                          dispatch(CalendarStateTogg(true));
                        }}
                      >
                        <img src={DateSvg} alt="sdahs" />
                      </div>
                      <div style={{ display: "flex", marginRight: "6rem" }}>
                        <div>
                          <img src={tag} alt="sdahs" />
                        </div>
                        <div
                          style={{ margin: "0rem 2rem" }}
                          className={styled.semiCircle2}
                        >
                          <span style={{ fontSize: "1.2rem" }}>Issues</span>
                          <span style={{ fontSize: "1.2rem" }}>2</span>
                        </div>
                        <div className={styled.semiCircle3}>
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "2.5rem",
                              marginBottom: "1.5rem",
                            }}
                          >
                            .
                          </span>
                          <span>Feature</span>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: "flex" }}>
                          <div>
                            <img src={profile} alt="sdahs" />
                          </div>
                          <div
                            style={{ marginLeft: "3rem", fontSize: "1.2rem" }}
                          >
                            Jan 20
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styled.branch_line1}>
                    <div style={{ border: ".25px solid #413E3E" }}></div>
                  </div>
                </>
              );
            } else {
              return;
            }
          })}
      </div>
      <div style={{ marginTop: "1.5rem", fontSize: "1.4rem" }}>
        Ticked Items
      </div>

      <div style={{ maxHeight: "25%", height: "25%", marginTop: "1rem" }}>
        {myTaskState1 &&
          myTaskState1.map((ele, ind) => {
            if (ele.markStatus == "tickmark") {
              const isDropdownOpen3 =
                selectedDropdownIndex3 === ind && dropdownState3[ind];
              const isDropdownOpen4 =
                selectedDropdownIndex4 === ind && dropdownState4[ind];

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
                    }}
                    draggable={pageName[5] !== "all"}
                    onDragStart={(e) => {
                      handleDragStart(e, ele);
                      e.target.style.opacity = 0.5;
                      e.target.style.width = "10rem";
                      e.target.style.overflow = "hidden";
                    }}
                    onDragEnd={(e) => {
                      e.target.style.width = "100%";
                      e.target.style.opacity = 1;
                      e.target.style.height = "6.7rem";
                      e.target.style.display = "flex";
                      e.target.style.justifyContent = "space-between";
                      e.target.style.alignItems = "center";
                    }}
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
                        style={{
                          // maxWidth: "2.5rem",
                          marginRight: "1.5rem",
                        }}
                        onClick={() => {
                          if (ele.markStatus == "unmark") {
                            console.log("sjhdhd34343");
                            handleOptionSelect5("tickmark", ind);
                          } else {
                            console.log("dhhu42423432");
                            handleOptionSelect5("unmark", ind);
                          }
                        }}
                      >
                        {console.log(
                          "ashhsa",
                          selectedValues5[ind]?.image,
                          selectedValues5[ind]?.value
                        )}

                        <img
                          src={selectedValues5[ind]?.image}
                          alt="sads"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </div>
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
                          if (pageName[5] != "All") {
                            dispatch(TaskInfoTaskValue(ele));
                            navigate(
                              `/home/${projectname}/${tabid}/mytask/${pageName[5]}/${ele.name}/Overview`
                            );
                          }
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
                            maxHeight: "2rem",
                          }}
                        >
                          {ele.desc}
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
                        <span>2</span>
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
                          <div className={styled.Listpercentage}></div>
                        </div>
                        <div style={{ fontSize: "1.2rem" }}>40%</div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div
                        style={{ marginRight: "3rem" }}
                        onClick={() => {
                          dispatch(CalendarStateTogg(true));
                        }}
                      >
                        <img src={DateSvg} alt="sdahs" />
                      </div>
                      <div style={{ display: "flex", marginRight: "6rem" }}>
                        <div>
                          <img src={tag} alt="sdahs" />
                        </div>
                        <div
                          style={{ margin: "0rem 2rem" }}
                          className={styled.semiCircle2}
                        >
                          <span style={{ fontSize: "1.2rem" }}>Issues</span>
                          <span style={{ fontSize: "1.2rem" }}>2</span>
                        </div>
                        <div className={styled.semiCircle3}>
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "2.5rem",
                              marginBottom: "1.5rem",
                            }}
                          >
                            .
                          </span>
                          <span>Feature</span>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: "flex" }}>
                          <div>
                            <img src={profile} alt="sdahs" />
                          </div>
                          <div
                            style={{ marginLeft: "3rem", fontSize: "1.2rem" }}
                          >
                            Jan 20
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styled.branch_line1}>
                    <div style={{ border: ".25px solid #413E3E" }}></div>
                  </div>
                </>
              );
            } else {
              return;
            }
          })}
      </div>
    </>
  );
}

export default DomainTaskSub;
