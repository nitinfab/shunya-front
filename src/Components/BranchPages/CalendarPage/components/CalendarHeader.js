import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import Clock from "../../../../assets/Clock.svg"
import rightarrow from "../../../../assets/rightarrow.svg"
import leftarrow from "../../../../assets/leftarrow.svg"
import downCarret from "../../../../assets/downCarret.svg"
import downArrow from "../../../../assets/downArrow.svg"



import GlobalContext from "../context/GlobalContext";
import styled from "../CalendarStyle.module.css";
import { useNavigate, useParams } from "react-router";
import { getWeek } from "../util";


export default function CalendarHeader() {
  const { tabid, projectname } = useParams();
  const pageName = window.location.pathname.split("/");

  const navigate = useNavigate()

  const [calendarPage, setCalendarPage] = useState([
    "month",
    "week",
  ]);
  const [selectedOption, setSelectedOption] = useState(calendarPage[0]);
  const [weekStart, setWeekStart] = useState(dayjs());

  const { monthIndex, setMonthIndex,  weekIndex, setWeekIndex} = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handlePrevWeek() {
    setWeekIndex(weekIndex - 1);
  }
  function handleNextWeek() {
    setWeekIndex(weekIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    // console.log("Selected value is" + selectedValue);
    setSelectedOption(selectedValue);
    navigate(`/home/${projectname}/${tabid}/calendar/${event.target.value}`);

  };
  // console.log("434",weekStart)
  return (
    <header className={styled.calendarHeader} >
      <div style={{ display: "flex", gap: "3rem" }}>
        <button
          onClick={handleReset}
          className={styled.button1}
          style={{color:"#7f7575"}}
        >
          Today
        </button>
        <h2 className={styled.button2}>
          <div>
            <img src={Clock} alt="Clock" />
          </div>
  
          <div>
            {dayjs(new Date(dayjs().year(), monthIndex)).format(
              "MMMM YYYY"
            )}
          </div>
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button onClick={()=>{
            if(pageName[5]=="month")
            handlePrevMonth()
            else
            handlePrevWeek()

// getWeek(-1)

            // setWeekStart(weekStart.subtract(1, "week"))
          }}>
            {/* <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
        </span> */}
            <img src={leftarrow} alt="Clock" />

          </button>
          <button onClick={()=>{
            if(pageName[5]=="month")
            handleNextMonth()
            else
            handleNextWeek()

// getWeek(+1)

            // setWeekStart(weekStart.add(1, "week"))
          }}>
            {/* <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
        </span> */}
            <img src={rightarrow} alt="Clock" style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>
        </div>
        <div className={styled.button3}>
          <div>Domain Name</div>
          <div><img src={downCarret} alt="sddsdsd" /></div>
        </div>
      </div>
      <div>
        <div className={styled.calenderHeaderMonth}>
          {/* <div>Month</div>
        <div><img src={downArrow} alt="sddsdsd"/></div> */}
          <select
            defaultValue={selectedOption}
            onChange={handleOptionChange}
            className={styled.selectTagStyle1}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
            }}

          >
            {calendarPage.map((ele, ind) => (
              <option
                key={ind}
                defaultValue={ele}
                selected={ele == pageName[4]}
              >
                {ele}
              </option>
            ))}
          </select>

        </div>
      </div>
    </header>
  );
}
