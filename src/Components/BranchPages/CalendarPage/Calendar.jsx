import React, { useState, useContext, useEffect } from "react";
import { getMonth,getWeek, getWeekDisplayText } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import styled from "./CalendarStyle.module.css";
import EventModal from "./components/EventModal";
import { useParams } from "react-router";
import Week from "./components/Week";
import dayjs from "dayjs";
function Calendar() {
    const { days } = useParams()
    const pageName = window.location.pathname.split("/");
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const [currenWeek, setCurrentWeek] = useState(getWeek());
    const { monthIndex,weekIndex, showEventModal } = useContext(GlobalContext);
//   const [weekStart, setWeekStart] = useState(dayjs());

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);
    useEffect(() => {
        setCurrentWeek(getWeek(weekIndex));
    }, [weekIndex]);
    return (
        <div className={styled.calendarMainContainer}>
            {showEventModal && <EventModal />}
            {/* <div className="h-screen flex flex-col" style={{border:"1px solid red"}}> */}
            <div className={styled.calendarContainer}>
                <div style={{ width: "100%", minHeight: "6.6rem", border: ".5px solid #413E3E", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center" }}>
                    <CalendarHeader />
                </div>
                <div className="flex flex-1" style={{maxHeight:"90%",}}>
                    {days === "month" ? <Month month={currenMonth} /> : <Week currenWeekprops={currenWeek}/>}
                </div>
            </div>
        </div>
    );
}

export default Calendar;


// import React from "react";
// import ReactDOM from 'react-dom'
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { tableSlice } from "./eventSlice";
// import App from './App'
// import './index.css'

// const store = configureStore({
//     reducer: {
//         table: tableSlice.reducer,
//     },
// });

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')

// );

// export default store;

