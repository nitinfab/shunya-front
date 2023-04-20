import React, { useEffect, useState } from "react";
import PageNav from "../PageNav";
import styled from "./mainstyle.module.css";
import DragMain from "./DragDrop/DragMain";
import {  useDispatch, useSelector } from "react-redux";
import Maximize from "../../../assets/Maximize.svg";
import link from "../../../assets/link.svg";
import cross from "../../../assets/cross.svg";
import High from "../../../assets/highPrio.svg";
import To_do from "../../../assets/todoS.svg";
import In_Progress from "../../../assets/progS.svg";
import Done from "../../../assets/doneS.svg";
import Backlog from "../../../assets/backS.svg";
import label from "../../../assets/label.svg";
import assignee from "../../../assets/user.svg";
import Urgent from "../../../assets/urgentPrio.svg";
import Mid from "../../../assets/midPrio.svg";
import Low from "../../../assets/lowPrio.svg";
import { myTaskDataAction } from "../../../redux/myTaskSlice";

function Main() {
  const dispatch=useDispatch()
  const pageName = window.location.pathname.split("/");
  const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const [newTask, setNewTask] = useState(false);

  const [newTaskData, setNewTaskData] = useState({
    taskName: "",
    description: "",
  });

  const now = new Date();

  // Get the day (0-6)
  const dayOfWeek = now.getDay();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[dayOfWeek];

  // Get the date (1-31)
  const date = now.getDate();

  // Get the month (0-11)

  const monthNum = now.getMonth();
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthsOfYear[monthNum];


  /////////////////////////////////
  const [domainDetail3, setDomainDetail3] = useState(
    myTaskStateValue && myTaskStateValue
      ?.find((ele) => ele.title === "Assigned")
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

  // Assigned Task 
  function AddTaskFunc() {
    let insertCard = [...myTaskStateValue];
    let CardId =
      Date.now().toString() +
      Math.random().toString(36).substring(2).toLocaleString();
    const newCard = {
      id: CardId,
      name: newTaskData.taskName,
      desc: newTaskData.description
        ? newTaskData.description
        : "Description of the task comes here. A brief about what the task ",
      labels: [],
      date: "",
      tasks: [{
        subtask:[],
        issues:[],
        files:[],
        review:[],
      }],
      start: "",
      end: "",
      progress: 40,
      type: "task",
      project: "ProjecSample",
      priority: selectedValues4[0].value ? selectedValues4[0].value : "Low",
      status: selectedValues3[0].value ? selectedValues3[0].value : "To_do",
    };
    const updatedCards = insertCard.map((category) => {
      if (category.title === "All" || category.title === "Assigned") {
        return {
          ...category,
          cards: [newCard, ...category.cards],
        };
      } else {
        return category;
      }
    });
  const unshiftDomain = async (userData) => {
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
                data: newCard,
                ticketName:"Assigned",
              },
            },
          }),
        });
      }
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Added Task in Mytask ")
        dispatch(myTaskDataAction(userData))
      }
  };
  unshiftDomain(updatedCards)
    setNewTask(!newTask);
  }


  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageNav />
      <div style={{ flex: 1, }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
        
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "3rem",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "2.2rem" }}>
              {day}, {month} {date}
            </div>
            <div style={{ margin: "2rem 0rem", fontSize: "3.2rem" }}>
              Good Morning, {tokenObject.userName}
            </div>
            <div className={styled.taskRemind} style={{ fontSize: "1.8rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "2.8rem", marginRight: "1rem" }}>0</div>
                <div style={{ fontSize: "1.8rem" }}>Tasks completed</div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "2.8rem", marginRight: "1rem" }}>0</div>
                <div style={{ fontSize: "1.8rem" }}>Priorities</div>
              </div>
              <div>
                <select
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#fff",
                    borderLeft: "1px solid #7f7575",
                    paddingLeft: "1rem",
                    fontSize: "1.4rem",
                  }}
                >
                  <option>My Week</option>
                  <option>My Month</option>
                  <option>My Year</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <DragMain setNewTask={setNewTask} newTask={newTask}></DragMain>
          </div>
        </div>
      </div>
{/* ///////////////////////////////////////////////////////////////////////////////// */}
{/* ///////////////////////////////////////////////////////////////////////////////// */}
      {newTask ? (
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
                    // setMaximizeState(!maximizeState);
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
                        ].map((option,ind) => (
                          <li
                            key={ind}
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
                        ].map((option,ind) => {
                          if (true) {
                            return (
                              <li
                                key={ind}
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
    </div>
  );
}

export default Main;
