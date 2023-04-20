import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import styled from "../CalendarStyle.module.css";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let DayDate=day.$d.toLocaleDateString('en-US',options).split(" ")[0];
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  function eventEdit(){
    setDaySelected(day);
    setShowEventModal(true);
  }
  return (
    <div className={`${DayDate=="Sat,"?styled.DayContainer1:styled.DayContainer}`} >
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-3" style={{fontSize:"1.2rem"}}>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
          style={{fontSize:"1.1rem",marginTop:"1.5rem"}}
          onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className={`flex-1 cursor-pointer ${styled.eventContainer}`}
      
     
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt)
              eventEdit()
            }}
            className={`bg-${evt.label}-200 p-2 mr-2 text-gray-600 text-sm rounded mb-1 truncate h-12`}
            style={{display:"flex",alignItems:"center",fontSize:"1.1rem"}}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
