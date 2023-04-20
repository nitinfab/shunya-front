import React, { useEffect, useRef, useState } from "react";
import rightarrow from "../../../../../assets/rightarrow.svg";
import network from "../../../../../assets/network.svg";
import tag from "../../../../../assets/tag.svg";
import redTag from "../../../../../assets/redTag.svg";
import greenTag from "../../../../../assets/greenTag.svg";
import cross from "../../../../../assets/cross.svg";
import Urgent from "../../../../../assets/urgentPrio.svg";
import Mid from "../../../../../assets/midPrio.svg";
import Low from "../../../../../assets/lowPrio.svg";
import High from "../../../../../assets/highPrio.svg";
import profile from "../../../../../assets/profile.svg";
import To_do from "../../../../../assets/todoS.svg";
import DateSvg from "../../../../../assets/Date.svg";
import labeluntick from "../../../../../assets/labeluntick.svg";
import labeltick from "../../../../../assets/labeltick.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { labelContStateTogg,labelContStateValue } from "../../../../../redux/labelContSlice";

import In_Progress from "../../../../../assets/progS.svg";
import Done from "../../../../../assets/doneS.svg";
import Backlog from "../../../../../assets/backS.svg";
import styled from "../../DomainPages/DomainPageStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  domainNameUpdate,
  domainTaskTogg,
  domainUpdate,
} from "../../../../../redux/domainToggSlice";
import { useNavigate, useParams } from "react-router";
import { workspaceDataAction } from "../../../../../redux/workspaceDataSlice";
import {
  CalendarStateTogg,
  profileStateTogg,
  profileStateValue,
  CalendarStateValue,
  labelStateValue,
  labelStateTogg,
} from "../../../../../redux/CalendarSlice";
import { TaskInfoTaskValue } from "../../../../../redux/TaskInfoSlice";
function List() {
  const pageName = window.location.pathname.split("/");
  const navigate = useNavigate();
  const {
    pageNavName,
    projectname,
    tabid,
    workspace,
    taskPage,
    DomainTaskName,
  } = useParams();
  const dispatch = useDispatch();
  let domainTaskLen,subTaskLen;
  const [assignView, setAssignView] = useState([]);
  const [unassignM, setUnassignM] = useState("");

  const [labelView, setLabelView] = useState("");
  const [calendarView, setCalendarView] = useState("");
  const [userAssign, setuserAssign] = useState(false);
  const [userLabel, setuserLabel] = useState(false);

  const [editLabelState, seteditLabelState] = useState(false);
  const [labelEditedConfirm, setlabelEditedConfirm] = useState(false);
  const [startDateTogg, setStartDateTogg] = useState(false);
  const [endDateTogg, setEndDateTogg] = useState(false);
  const labelContValue = useSelector((state) => state.labelContB);
  const projectStateValue = useSelector((state) => state.ProjectNameB);



  const workspaceDataValue = useSelector((state) => state.workspaceDataB);
  const domainSwitch = useSelector((state) => state.domainTask);
  const CalendarStateBValue = useSelector((state) => state.CalendarStateB);
  const allMemberStateValue = useSelector((state) => state.allMemberStateB);
  const [labelDetails, setLabelDetails] = useState({
    name: "",
    value: "",
  });

  const [clickedIndex, setClickedIndex] = useState(-1);
  const handleClick = (index) => {
    setClickedIndex(index);
  };



////////////////////////////////////////////////////////////////////      Tasks      /////////////////////////////////////////////////////////////////


  const [domainDetail, setDomainDetail] = useState(
    domainSwitch.domainId != ""
      ? workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
            )
              return ele;
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) return ele;
          })
          ?.tasks?.find((ele) => {
            if (
              ele.title ==
              pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
            )
              return ele;
          }).cards
      : []
  );
  useEffect(() => {
    setDomainDetail(
      domainSwitch.domainId != ""
        ? workspaceDataValue
            .find((ele, ind) => {
              if (
                ele.title ==
                pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
              )
                return ele;
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == domainSwitch.domainId) return ele;
            })
            ?.tasks?.find((ele) => {
              if (
                ele.title ==
                pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
              )
                return ele;
            }).cards
        : []
    );
  }, [window.location.pathname, workspaceDataValue]);


  const [domainDetail3, setDomainDetail3] = useState(
    workspaceDataValue
      ?.find(
        (ele) =>
          ele.title ==
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
      )
      ?.cards.map((ele) => ele) || []
  );

  ///////////////////////////////////////////////////////  Task :-------   Priority And Status

  ///////////////////////////////////////////  0   Task Status.
  
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(null);
  const [dropdownState, setDropdownState] = useState([]);
  const [toggstate, settoggstate] = useState(false);

  const handleOptionSelect = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption(option) };

      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (
                      task.title ===
                      pageName[8]?.charAt(0).toUpperCase() +
                        pageName[8]?.slice(1)
                    ) {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (ind === index) {
                            TargetedTicketTask = tty._id;

                            return {
                              ...tty,
                              status: newValues[index].value,
                            };
                          } else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });
      const updatedTask1 = updatedTask?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (task.title === "All") {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (tty._id == TargetedTicketTask) {
                            return {
                              ...tty,
                              status: newValues[index].value,
                            };
                          } else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });
      if (
        pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1) !=
        "All"
      ) {
        dispatch(workspaceDataAction(updatedTask1));
        updatedTaskFunc(updatedTask1);
      }
      return newValues;
    });
    setDropdownState((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate(false);
  };

//////////////////////////////////////////////////   1   Task Priority

  const [selectedValues1, setSelectedValues1] = useState([]);
  const [selectedDropdownIndex1, setSelectedDropdownIndex1] = useState(null);
  const [dropdownState1, setDropdownState1] = useState([]);
  const [toggstate1, settoggstate1] = useState(false);

  const handleOptionSelect1 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues1((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption1(option) };

      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (
                      task.title ===
                      pageName[8]?.charAt(0).toUpperCase() +
                        pageName[8]?.slice(1)
                    ) {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (ind === index) {
                            TargetedTicketTask = tty._id;

                            return {
                              ...tty,
                              priority: newValues[index].value,
                            };
                          } else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });
      const updatedTask1 = updatedTask?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (task.title === "All") {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (tty._id == TargetedTicketTask) {
                            return {
                              ...tty,
                              priority: newValues[index].value,
                            };
                          } else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });
      if (
        pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1) !=
        "All"
      ) {
        dispatch(workspaceDataAction(updatedTask1));
        updatedTaskFunc(updatedTask1);
      }
      return newValues;
    });

    setDropdownState1((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
    settoggstate1(false);
  };

    ///////////////////////////////////////////  7   :---  Tag
    const [selectedValues7, setSelectedValues7] = useState([]);
    const [selectedDropdownIndex7, setSelectedDropdownIndex7] = useState(null);
    const [dropdownState7, setDropdownState7] = useState([]);
    const [toggstate7, settoggstate7] = useState(false);
  
    const handleOptionSelect7 = (option, index) => {
      let TargetedTicketTask;
      setSelectedValues7((prevState) => {
        const newValues = [...prevState];
        newValues[index] = { value: option, image: getImageForOption3(option) };
  
        let updateArray = [...workspaceDataValue];
        const updatedTask = updateArray?.map((ele) => {
          if (
            ele.title ===
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((card) => {
                if (card._id === domainSwitch.domainId) {
                  return {
                    ...card,
                    tasks: card.tasks.map((task) => {
                      if (
                        task.title ===
                        pageName[8]?.charAt(0).toUpperCase() +
                          pageName[8]?.slice(1)
                      ) {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {
                            if (ind === index) {
                              TargetedTicketTask = tty._id;
  
                              return {
                                ...tty,
                                tag: newValues[index].value,
                              };
                            } else {
                              return tty;
                            }
                          }),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return card;
              }),
            };
          }
          return ele;
        });
        const updatedTask1 = updatedTask?.map((ele) => {
          if (
            ele.title ===
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((card) => {
                if (card._id === domainSwitch.domainId) {
                  return {
                    ...card,
                    tasks: card.tasks.map((task) => {
                      if (task.title === "All") {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {
                            if (tty._id == TargetedTicketTask) {
                              return {
                                ...tty,
                                tag: newValues[index].value,
                              };
                            } else {
                              return tty;
                            }
                          }),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return card;
              }),
            };
          }
          return ele;
        });
        
        dispatch(workspaceDataAction(updatedTask1));
  
        updatedTaskFunc(updatedTask1);
        return newValues;
      });
      setDropdownState7((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
      settoggstate7(false);
    };


  ////////////////////////// Assign Member in Domain Task .......


  async function AddTaskAssigMem(element) {
    function updateAssigMem(element) {
      let updateArray = [...workspaceDataValue];
    

     let AssinMemUpdatedArray= updateArray?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (
                      task.title ===
                      pageName[8]?.charAt(0).toUpperCase() +
                        pageName[8]?.slice(1)
                    ) {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (tty._id === CalendarStateBValue.otherValue.targetId) {

                            return {
                              ...tty,
                              assignMem: [...tty.assignMem, element],
                            };
                          } 
                          else {
                            return tty;
                          }
                        }),
                      };
                    }
                  else  if (
                      task.title === "All"
                    ) {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (tty._id === CalendarStateBValue.otherValue.targetId) {
                            return {
                              ...tty,
                              assignMem: [...tty.assignMem, element],
                            };
                          } 
                          else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });

      dispatch(workspaceDataAction(AssinMemUpdatedArray));
      updatedTaskFunc(AssinMemUpdatedArray);
    }
    if (CalendarStateBValue.otherValue.targetId != "" && pageName[6] != "all") {
      updateAssigMem(element);
    }
  }
 
/////////////////////////////////////   Update Task Function     .....

    function updatedTaskFunc(updatedData) {
    
      let targetTitle =
        pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1);
      let targetTitle1 =
        pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1);
      async function DomainTaskFunc(ticket, ticket1, updatedData) {
        let res, data;
        const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  
        res = await fetch(`http://localhost:8000/user/workspace/task/update`, {
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
                data: updatedData
                  .find((ele, ind) => {
                    if (ele.title == targetTitle) return ele;
                  })
                  .cards.find((ele, ind) => {
                    console.log("ase3",ele)
                    if (ele._id === domainSwitch.domainId) {

                      console.log("dasdha3432",ele)
                      return ele
                    }
                  })
                  .tasks.find((ele, ind) => {
                    if (ele.title == targetTitle1) return ele;
                  }),
                data1: updatedData
                  .find((ele, ind) => {
                    if (ele.title == targetTitle) return ele;
                  })
                  .cards.find((ele, ind) => {
                    if (ele._id === domainSwitch.domainId) return ele;
                  })
                  .tasks.find((ele, ind) => {
                    if (ele.title == "All") return ele;
                  }),
                ticketName1: ticket,
                ticketName2: ticket1,
                domainName: domainSwitch.domainId,
              },
              workspaceName: workspace,
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
        }
      }
      DomainTaskFunc(targetTitle, targetTitle1, updatedData);
    }


  //////////////////// Add Label IN Domain TAsk function ......

  async function AdduserLabelDomainTask(element,AddorRemove) {
    function updateuserLabel(element) {
      let updatedData;
      let updateArray = [...workspaceDataValue];
      if(AddorRemove){  
        updatedData= updateArray?.map((ele) => {
          if (
            ele.title ===
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((card) => {
                if (card._id === domainSwitch.domainId) {
                  return {
                    ...card,
                    tasks: card.tasks.map((task) => {
                      if (
                        task.title ===
                        pageName[8]?.charAt(0).toUpperCase() +
                          pageName[8]?.slice(1)
                      ) {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {
                            if (tty._id === CalendarStateBValue.labelValue.targetId) {
  
                              return {
                                ...tty,
                                     labels: tty.labels.filter((ele, ind) => {
                      if (ele.name != element.name) return true;
                    }),
                              };
                            } 
                            else {
                              return tty;
                            }
                          }),
                        };
                      }
                    else  if (
                        task.title === "All"
                      ) {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {
                            if (tty._id === CalendarStateBValue.labelValue.targetId) {
                              return {
                                ...tty,
                                labels: tty.labels.filter((ele, ind) => {
                                  if (ele.name != element.name) return true;
                                }),
                              };
                            } 
                            else {
                              return tty;
                            }
                          }),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return card;
              }),
            };
          }
          return ele;
        });

      }
      else{
    
        updatedData= updateArray?.map((ele) => {
          if (
            ele.title ===
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
          ) {
            return {
              ...ele,
              cards: ele.cards.map((card) => {
                if (card._id === domainSwitch.domainId) {
                  return {
                    ...card,
                    tasks: card.tasks.map((task) => {
                      if (
                        task.title ===
                        pageName[8]?.charAt(0).toUpperCase() +
                          pageName[8]?.slice(1)
                      ) {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {
                            if (tty._id == CalendarStateBValue.labelValue.targetId) {
  
                              return {
                                ...tty,
                    labels: [
                      ...tty.labels,
                      {
                        name: element.name,
                        value: element.value,
                        status: element.status,
                      },
                    ],
                              };
                            } 
                            else {
                              return tty;
                            }
                          }),
                        };
                      }
                    else  if (
                        task.title === "All"
                      ) {
                        return {
                          ...task,
                          cards: task.cards.map((tty, ind) => {

                            if (tty._id == CalendarStateBValue.labelValue.targetId) {
                              return {
                                ...tty,
                                labels: [
                                  ...tty.labels,
                                  {
                                    name: element.name,
                                    value: element.value,
                                    status: element.status,
                                  },
                                ],
                              };
                            } 
                            else {
                              return tty;
                            }
                          }),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return card;
              }),
            };
          }
          return ele;
        });

      }

      dispatch(workspaceDataAction(updatedData));
      updatedDomainFunc(updatedData);
    }
    if (CalendarStateBValue.labelValue.targetId != "" &&  pageName[8] != undefined &&
    pageName[8] != "all") {
      updateuserLabel(element,AddorRemove);
    }
  }

//////////////////////////////////////////////////////////////////  Self Function Call when Calendar Update

  useEffect(() => {
    function updateCalender() {
      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray?.map((ele) => {
        if (
          ele.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((card) => {
              if (card._id === domainSwitch.domainId) {
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (
                      task.title ===
                      pageName[8]?.charAt(0).toUpperCase() +
                        pageName[8]?.slice(1)
                    ) {
                      return {
                        ...task,
                        cards: task.cards.map((tty, ind) => {
                          if (tty._id == CalendarStateBValue.targetId) {
                            return {
                              ...tty,
                              start: CalendarStateBValue.value.start,
                              end: CalendarStateBValue.value.end,
                            };
                          } else {
                            return tty;
                          }
                        }),
                      };
                    }
                    return task;
                  }),
                };
              }
              return card;
            }),
          };
        }
        return ele;
      });
      dispatch(workspaceDataAction(updatedTask));
      updatedDomainFunc(updatedTask);
    }
    if (
      CalendarStateBValue.targetId != "" &&
      pageName[8] != undefined &&
      pageName[8] != "all"
    ) {
      updateCalender();
    }
  }, [CalendarStateBValue.value]);
////////////////////////////////////////////////////////////////////      Domains      /////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////  3 :------  Domains Status
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
      const updatedTask = updateArray.map((task) => {
        if (
          task.title ===
          pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
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

      dispatch(workspaceDataAction(updatedTask1));

      updatedDomainFunc(updatedTask1);
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
    ////////////////////////////////////////////   4   Domains Priority  

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
        const updatedTask = updateArray.map((task) => {
          if (
            task.title ===
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
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
  
        dispatch(workspaceDataAction(updatedTask1));
  
        updatedDomainFunc(updatedTask1);
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

  ///////////////////////////////////////////  6   :---  Tag
  const [selectedValues6, setSelectedValues6] = useState([]);
  const [selectedDropdownIndex6, setSelectedDropdownIndex6] = useState(null);
  const [dropdownState6, setDropdownState6] = useState([]);
  const [toggstate6, settoggstate6] = useState(false);

  const handleOptionSelect6 = (option, index) => {
    let TargetedTicketTask;
    setSelectedValues6((prevState) => {
      const newValues = [...prevState];
      newValues[index] = { value: option, image: getImageForOption3(option) };

      let updateArray = [...workspaceDataValue];
      const updatedTask = updateArray.map((task) => {
        if (
          task.title ===
          pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
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
      dispatch(workspaceDataAction(updatedTask1));

      updatedDomainFunc(updatedTask1);
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


  ///////////////////////////////////   Calendar  Date Change Handle

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };
  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };
  const calendarRef = useRef(null);
  const tagRef = useRef(null);
  const labelRef = useRef(null);
  const createlabelRef = useRef(null);
  const assignRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setStartDate(null);
        setEndDate(null);
       dispatch(CalendarStateTogg(false))
   
      }
     else if (tagRef.current && !tagRef.current.contains(event.target)) {
      
        settoggstate6(false) 
        settoggstate7(false) 
            }
            else if (labelRef.current && !labelRef.current.contains(event.target)) {
      
             setuserLabel(false)
                  }
                  else if (createlabelRef.current && !createlabelRef.current.contains(event.target)) {
        seteditLabelState(false)
                        }
                        else if (assignRef.current && !assignRef.current.contains(event.target)) {
                          setuserAssign(false)
                                          }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [totalDomain, setTotalDomain] = useState(
    workspaceDataValue
      ? workspaceDataValue.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )?.cards
      : []
  );

  ////////////////////////// Assign Member .......


  async function AddAssigMem(element) {
    function updateAssigMem(element) {
      let updatedDate = workspaceDataValue.map((ele) => {
        if (
          ele.title ===
          pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
        ) {
          return {
            ...ele,
            cards: ele.cards.map((task) => {
              if (task._id === CalendarStateBValue.otherValue.targetId) {
                return {
                  ...task,
                  assignMem: [...task.assignMem, element],
                };
              }
              return task;
            }),
          };
        } else if (ele.title === "All") {
          return {
            ...ele,
            cards: ele.cards.map((task) => {
              if (task._id === CalendarStateBValue.otherValue.targetId) {
                return {
                  ...task,
                  assignMem: [...task.assignMem, element],
                };
              }
              return task;
            }),
          };
        }
        return ele;
      });
      dispatch(workspaceDataAction(updatedDate));
      updatedDomainFunc(updatedDate);
    }
    if (CalendarStateBValue.otherValue.targetId != "" && pageName[6] != "all") {
      updateAssigMem(element);
    }
  }

  //////////////////// Add Label function ......

  async function AdduserLabel(element,AddorRemove) {
    function updateuserLabel(element) {
      let updatedDate;
      if(AddorRemove){  
        updatedDate = workspaceDataValue.map((ele) => {
          if (
            ele.title ===
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
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
                    labels: task.labels.filter((ele, ind) => {
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


      }
      else{
         updatedDate = workspaceDataValue.map((ele) => {
          if (
            ele.title ===
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
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
                        status: element.status,
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
      dispatch(workspaceDataAction(updatedDate));
      updatedDomainFunc(updatedDate);
    }
    if (CalendarStateBValue.labelValue.targetId != "" && pageName[6] != "all") {
      updateuserLabel(element,AddorRemove);
    }
  }


  /////////////////////////////   Update  Domain function.....

  function updatedDomainFunc(updatedData) {
    let targetTitle =
      pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1);

    async function DomainFunc(ticket, updatedData) {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

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
      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
      }
    }

    DomainFunc(targetTitle, updatedData);
  }


 /////////////////////////////////////// Self Updating Domain Calendar
 useEffect(() => {
  function updateCalender() {
    let updatedDate = workspaceDataValue.map((ele) => {
      if (
        ele.title ===
        pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
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

      return ele;
    });

    dispatch(workspaceDataAction(updatedDate));
    updatedDomainFunc(updatedDate);
  }

  if (CalendarStateBValue.targetId != "" && pageName[6] != "all" && pageName[8]==undefined) {
    updateCalender();
  }
}, [CalendarStateBValue.value]);




////////////////////////////////////////////////////////////////////      Domains      /////////////////////////////////////////////////////////////////



/////////////////////////////////////   Drag And drop          (Not Sure)                         Drag And drop

  function handleDragStart(e, data) {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }
  function handleDragStart1(e, data) {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }


  ////////////////////////////////////////////////////////////////  Update all selectedValue()  :-- Status, Priority, and Tags

  useEffect(() => {
    setSelectedValues(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption(ele.status),
          value: ele.status,
        }))
    );

    setDropdownState(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map(() => false)
    );
    setSelectedValues1(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption1(ele.priority),
          value: ele.priority,
        }))
    );

    setDropdownState1(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map(() => false)
    );


    setSelectedValues7(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption3(ele.tag),
          value: ele.tag,
        }))
    );

    setDropdownState7(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
          )
            return ele;
        })
        .cards.map(() => false)
    );

    setTotalDomain(
      workspaceDataValue
        ? workspaceDataValue.find(
            (ele) =>
              ele.title ==
              pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
          )?.cards
        : []
    );
  }, [workspaceDataValue, window.location.pathname]);

  useEffect(() => {
    setSelectedValues3(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption(ele.status),
          value: ele.status,
        }))
    );

    setDropdownState3(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.map(() => false)
    );
    setSelectedValues6(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
        )
        ?.cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption3(ele.tag),
          value: ele.tag,
        }))
    );
    setDropdownState6(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
        )
        ?.cards.map(() => false)
    );
    setSelectedValues4(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.map((ele) => ele)
        .map((ele, ind) => ({
          image: getImageForOption1(ele.priority),
          value: ele.priority,
        }))
    );

    setDropdownState4(
      workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.map(() => false)
    );
  }, [workspaceDataValue, window.location.pathname]);




    /////////////////////////////////////    Ref Section.  (NOt Sure:- Its Working or not for handleClickOutside priority and status)
    const prioRef = useRef(null);
    const prioRef1 = useRef(null);
    const statusRef = useRef(null);
    const statusRef1 = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          prioRef.current &&
          !prioRef.current.contains(event.target) &&
          prioRef1.current &&
          !prioRef1.current.contains(event.target)
        ) {
          settoggstate1(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          statusRef.current &&
          !statusRef.current.contains(event.target) &&
          statusRef1.current &&
          !statusRef1.current.contains(event.target)
        ) {
          settoggstate(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

////////////////////////////////////////////////////////////   Fetch Function

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
        setUnassignM(data.updatedUser.AllMember);
      }
    }
    useEffect(() => {
      fetchData();
    }, [allMemberStateValue]);

  return (
    <>
      {domainSwitch.value ? (
        <div style={{ position: "relative" }}>
          {totalDomain &&
            totalDomain.map((ele, ind) => {
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
                    draggable={pageName[6] !== "all"}
                    // onDragStart={(e) => handleDragStart(e, ele)}

                    onDragStart={(e) => {
                      handleDragStart(e, ele);
                      e.target.style.opacity = 0.5;
                      e.target.style.width = "15rem";
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
                    onDoubleClick={() => {
                      if (pageName[6] !== "all") {
                        console.log("dshhd", ele);
                        dispatch(
                          domainNameUpdate({
                            name: ele.name,
                            domainID: ele._id,
                            domainName:
                              pageName[6]?.charAt(0).toUpperCase() +
                              pageName[6]?.slice(1),
                          })
                        );
                        dispatch(domainTaskTogg());
                        navigate(
                          `/home/${projectname}/${tabid}/${workspace}/Domains/${pageNavName}/list/all`
                        );
                      }
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
                      >
                        {ele.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "31rem",
                        }}
                      >
                        <div style={{ marginTop: ".6rem" }}>
                          <img src={rightarrow} alt="sdahs" />
                        </div>
                        <div
                          style={{ margin: "0rem 1.5rem", fontSize: "1.4rem" }}
                        >
                          Description of the domain comes here
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
                        <span>{ele.tasks[0]?.cards?.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length }/{ele.tasks[0]?.cards?.length}</span>
                      
           
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
                        <div className={styled.Listpercentage} style={{width:ele.tasks[0]?.cards?.length > 0?`${Math.round(
                              (
                                (ele.tasks[0]?.cards?.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length /
                                  ele.tasks[0].cards.length) *
                                100
                              ).toFixed(2)
                            )}%`: "0%",
                            backgroundColor:Math.round(
                                    (
                                      (ele.tasks[0]?.cards?.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0].cards.length) *
                                      100
                                    ).toFixed(2)) > 70?"#FA4F57":Math.round(
                                    (
                                      (ele.tasks[0]?.cards?.filter(
                                        (ele, ind) => {
                                          if (ele.status !== "Done") {
                                            return ele;
                                          }
                                        }
                                      ).length /
                                        ele.tasks[0]?.cards?.length) *
                                      100
                                    ).toFixed(2)) < 30?"#3CD8FA":"#F4B507"
                            }}></div>
                      </div>
                        <div style={{ fontSize: "1.2rem" }}>

                        {ele.tasks[0].cards.length > 0
                          ? `${Math.round(
                              (
                                (ele.tasks[0].cards.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length /
                                  ele.tasks[0].cards.length) *
                                100
                              ).toFixed(2)
                            )}%`
                          : "0%"}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ display: "flex", marginRight: "6rem" }}>
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
                          {/* ///////////////////////// Calendar    */}

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
                                      display: `${
                                        endDateTogg ? "block" : "none"
                                      }`,
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

                                  dispatch(
                                    CalendarStateValue({
                                      start: dates[0].toLocaleDateString(
                                        "en-US",
                                        { month: "short", day: "numeric" }
                                      ),
                                      end: dates[1].toLocaleDateString(
                                        "en-US",
                                        { month: "short", day: "numeric" }
                                      ),
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
                                    ? "weekend"
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
                              top: "110%",
                              right: "-30%",
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
                        <div style={{ display: "flex" }}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
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
                          </div>
                          <div
                            style={{ marginLeft: "3rem", fontSize: "1.2rem" }}
                          >
                            {ele.date}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ////////////////////////////////////////   Assignee  */}
  
                    {userAssign && assignView == ind ? (
                      <div className={styled.userAssignContainer}  
                      ref={assignRef}
                      >
                        {workspaceDataValue
                          .find((ele, ind) => {
                            if (
                              ele.title ==
                              pageName[6].charAt(0).toUpperCase() +
                                pageName[6].slice(1)
                            )
                              return ele;
                          })
                          ?.cards.find((ele, ind) => {
                            if (
                              ele._id == CalendarStateBValue.otherValue.targetId
                            )
                              return ele;
                          }).assignMem.length >= 1 ? (
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
                        ) : (
                          ""
                        )}

                        <div className={styled.assignSection}>
                          {CalendarStateBValue.otherValue.targetId !== "" &&
                            workspaceDataValue
                              .find((ele, ind) => {
                                if (
                                  ele.title ==
                                  pageName[6].charAt(0).toUpperCase() +
                                    pageName[6].slice(1)
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
                                  let card = workspaceDataValue
                                    .find(
                                      (task) =>
                                        task.title ===
                                        pageName[6].charAt(0).toUpperCase() +
                                          pageName[6].slice(1)
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

                    {/* ////////////////////////////////////    Labels   */}

                    {userLabel && labelView == ind ? (
                      <div className={styled.labelContainer} 
          ref={labelRef}
                      
                      >
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
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: ".3rem",
                              padding: ".7rem",
                              fontSize: "1.1rem",
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
                          style={{ maxHeight: "12.5rem", overflow: "scroll" }}
                        >
                          {labelContValue.value.map((labelEle, ind) => {
                            const isLabelPresent = ele.labels.some(
                            (eleState) => eleState.name === labelEle.name
                          );
                            return (
                              <div
                                className={styled.labelContainerflex}
                                onClick={() => {
                                  dispatch(labelStateValue(labelEle));
                                  AdduserLabel(labelEle,ele.labels.some(
                                    (ele) => ele.name === labelEle.name
                                  ));
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
                      <div className={styled.newLableConatiner} 
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
                                  
                                  dispatch(labelContStateValue(data.updatedUser.projects.find((ele, ind) => {
          if (ele.projectName == projectStateValue) return ele;
        }).Labels))
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
        </div>
      ) : (
        <div>
          {domainDetail &&
            domainDetail.map((ele, ind) => {
              const isDropdownOpen =
                selectedDropdownIndex === ind && dropdownState[ind];
              const isDropdownOpen1 =
                selectedDropdownIndex1 === ind && dropdownState1[ind];
                const isDropdownOpen7 =
                selectedDropdownIndex7 === ind && dropdownState7[ind];
              return (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "6.7rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                    }}
                    draggable={pageName[8] !== "all" || pageName[6] !== "all"}
                    onDragStart={(e) => handleDragStart1(e, ele)}
                  >
                    <div
                      id={ind}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <div
                        id={ind}
                        onClick={() => {
                          settoggstate(true);
                          setSelectedDropdownIndex(ind);
                          setDropdownState((prevState) => {
                            const newState = [...prevState];
                            newState[ind] = !newState[ind];
                            return newState;
                          });
                        }}
                        style={{
                          maxWidth: "2.5rem",
                        }}
                        ref={statusRef}
                      >
                        <img
                          src={selectedValues[ind]?.image}
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
                        {toggstate && isDropdownOpen && (
                          <ul
                            className={styled.priorityContainer}
                            style={{ minWidth: "11.5rem" }}
                            ref={statusRef1}
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
                                  handleOptionSelect(option.value, ind)
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
                          settoggstate1(true);
                          setSelectedDropdownIndex1(ind);
                          setDropdownState1((prevState) => {
                            const newState = [...prevState];
                            newState[ind] = !newState[ind];
                            return newState;
                          });
                        }}
                        className={styled.selectableDrop}
                        ref={prioRef}
                      >
                        <img
                          src={selectedValues1[ind]?.image}
                          alt=""
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </div>
                      <div className={styled.priorityMainContainer}>
                        {toggstate1 && isDropdownOpen1 && (
                          <ul
                            className={styled.priorityContainer}
                            style={{ minWidth: "9rem" }}
                            ref={prioRef1}
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
                                      handleOptionSelect1(option.value, ind)
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
                                      handleOptionSelect1(option.value, ind)
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
                          minWidth: "8rem",
                        }}
                        onClick={() => {
                          if (pageName[8] != "all")
                            dispatch(TaskInfoTaskValue(ele));
                          navigate(
                            `/home/${projectname}/${tabid}/${workspace}/Domains/${pageName[6]}/list/${pageName[8]}/${ele.name}/Overview`
                          );
                        }}
                      >
                        {ele.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "31rem",
                        }}
                      >
                        <div style={{ marginTop: ".6rem" }}>
                          <img src={rightarrow} alt="sdahs" />
                        </div>
                        <div
                          style={{
                            margin: "0rem 1.5rem",
                            fontSize: "1.4rem",
                            minWidth: "25rem",
                          }}
                        >
                          Description of the domain comes here
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
                        <span>{ele.tasks[0].subtask.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length }/{ele.tasks[0].subtask.length}</span>
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
                        <div className={styled.Listpercentage} style={{width:ele.tasks[0].subtask.length > 0?`${Math.round(
                              (
                                (ele.tasks[0].subtask.filter((ele, ind) => {
                                  if (ele.status !== "Done") {
                                    return ele;
                                  }
                                }).length /
                                  ele.tasks[0].subtask.length) *
                                100
                              ).toFixed(2)
                            )}%`: "0%"}}></div>
                      </div>
                        <div style={{ fontSize: "1.2rem" }}>

                        {ele.tasks[0].subtask.length > 0
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
                      <div style={{ display: "flex", marginRight: "6rem" }}>
                        <div
                          style={{ marginRight: "3rem" ,position: "relative"}}
                          onClick={() => {
                            setCalendarView(ind)

                            dispatch(
                              CalendarStateTogg({
                                stateValue: true,
                                Id: ele._id,
                              })
                            );
                          }}
                        >
                          <img src={DateSvg} alt="sdahs" />
                           {/* ///////////////////////// Calendar    */}

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
                                      display: `${
                                        endDateTogg ? "block" : "none"
                                      }`,
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

                                  dispatch(
                                    CalendarStateValue({
                                      start: dates[0].toLocaleDateString(
                                        "en-US",
                                        { month: "short", day: "numeric" }
                                      ),
                                      end: dates[1].toLocaleDateString(
                                        "en-US",
                                        { month: "short", day: "numeric" }
                                      ),
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
                                    ? "weekend"
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
                          id={ind}
                          onClick={() => {
                            settoggstate7(true);
                            setSelectedDropdownIndex7(ind);
                            setDropdownState7((prevState) => {
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
                            src={selectedValues7[ind]?.image}
                            alt=""
                            style={{ width: "2rem", height: "2rem" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              width: "5rem",
                              top: "110%",
                              right: "-30%",
                              zIndex: 20,
                              backgroundColor:
                                "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
                              backdropFilter: "blur(6px)",
                              borderRadius: ".5rem",
                            }}
                          >
                            {toggstate7 && isDropdownOpen7 && (
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
                                      handleOptionSelect7(option.value, ind)
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
                        <div style={{ display: "flex" }}>
                          <div  
                           onClick={(e) => {
                              e.stopPropagation();
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
                          </div>
                          <div
                            style={{ marginLeft: "3rem", fontSize: "1.2rem" }}
                          >
                            {ele.date}
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* ////////////////////////////////////////   Assignee  */}

                    {userAssign && assignView == ind ? (
                      <div className={styled.userAssignContainer} 
                      ref={assignRef}
                      
                      >
                        { workspaceDataValue
            .find((ele, ind) => {
              if (
                ele.title ==
                pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
              )
                return ele;
            })
            ?.cards.find((ele, ind) => {
              if (ele._id == domainSwitch.domainId) return ele;
            })
            ?.tasks?.find((ele) => {
              if (
                ele.title ==
                pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
              )
                return ele;
            }).cards.find((ele, ind) => {
                            if (
                              ele._id == CalendarStateBValue.otherValue.targetId
                            )
                              return ele;
                          }).assignMem.length >= 1 ? (
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
                        ) : (
                          ""
                        )}

                        <div className={styled.assignSection}>
                          {CalendarStateBValue.otherValue.targetId !== "" &&
                          workspaceDataValue
        ?.find(
          (ele) =>
            ele.title ==
            pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
        )
        ?.cards.find((ele, ind) => {
          if (ele._id == domainSwitch.domainId) return ele;
        })
        ?.tasks?.find((ele) => {
          if (
            ele.title ==
            pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
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
                                      // dispatch(profileStateValue(ele));
                                      // AddAssigMem(ele);
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
                                  // dispatch(profileStateValue(ele));
                                  let targetedObb = ele;
                                  // let card = workspaceDataValue
                                  //   .find(
                                  //     (task) =>
                                  //       task.title ===
                                  //       pageName[6].charAt(0).toUpperCase() +
                                  //         pageName[6].slice(1)
                                  //   )
                                  //   ?.cards.find(
                                  //     (card) =>
                                  //       card._id ===
                                  //       CalendarStateBValue.otherValue.targetId
                                  //   );
                                  //   console.log("jkhshasd44AA",card)
                                  let card = workspaceDataValue
          .find((ele, ind) => {
            if (
              ele.title ==
              pageName[6]?.charAt(0).toUpperCase() + pageName[6]?.slice(1)
            )
              return ele;
          })
          ?.cards.find((ele, ind) => {
            if (ele._id == domainSwitch.domainId) return ele;
          })
          ?.tasks?.find((ele) => {
            if (
              ele.title ==
              pageName[8]?.charAt(0).toUpperCase() + pageName[8]?.slice(1)
            )
              return ele;
          })?.cards.find(
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
                                    AddTaskAssigMem(ele);
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

                    {/* ////////////////////////////////////    Labels   */}

                    {userLabel && labelView == ind ? (
                      <div className={styled.labelContainer} 
          ref={labelRef}
                      
                      >
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
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: ".3rem",
                              padding: ".7rem",
                              fontSize: "1.1rem",
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
                          style={{ maxHeight: "12.5rem", overflow: "scroll" }}
                        >
                          {labelContValue.value.map((labelEle, ind) => {
                            const isLabelPresent = ele.labels.some(
                            (eleState) => eleState.name === labelEle.name
                          );
                            return (
                              <div
                                className={styled.labelContainerflex}
                                onClick={() => {
                                  dispatch(labelStateValue(labelEle));
                                  AdduserLabelDomainTask(labelEle,ele.labels.some(
                                    (ele) => ele.name === labelEle.name
                                  ));
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
                      <div className={styled.newLableConatiner} 
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
                                  dispatch(labelContStateValue(data.updatedUser.projects.find((ele, ind) => {
          if (ele.projectName == projectStateValue) return ele;
        }).Labels))
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
        </div>
      )}
    </>
  );
}

export default List;
