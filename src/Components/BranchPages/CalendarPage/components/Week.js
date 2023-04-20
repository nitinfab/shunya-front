import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "./eventSlice";
import GlobalContext from "../context/GlobalContext";
import styled from "./Week.module.css";
import dayjs from "dayjs";
import bell from "../../../../assets/bell.svg"
import share from "../../../../assets/share.svg"
export default function Week({currenWeekprops}){
    console.log("Ytfgdvasbd",currenWeekprops[0][0])
let datWeek=[" Sun", " Mon", " Tue", " Wed", " Thu", " Fri", " Sat"];
 let extractDate =  currenWeekprops[0].map((ele,ind)=>{
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let DayDate=ele.$d.toLocaleDateString('en-US',options).split(" ")[2];
  return DayDate+datWeek[ind]
   })
    const days = extractDate
    const hours = Array.from({ length: 24 }, (_, i) => i + 1);
    const [popupVisible, setPopupVisible] = useState(false);
    const {
        setShowEventModal,
        filteredEvents,
        setDaySelected,
     setSelectedEvent,

        
    } = useContext(GlobalContext);
    const [selectedCell, setSelectedCell] = useState({});
    const dispatch = useDispatch();
    const events = useSelector(state => state.table);

    const handleClick = (day, hour) => {
        setSelectedCell({ day, hour });
        setShowEventModal(true);
        // setPopupVisible(true);
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
    };
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const eventName = event.target.elements.eventName.value;
        const startDate = event.target.elements.startDate.value;
        const endDate = event.target.elements.endDate.value;

        dispatch(addEvent({ eventName, startDate, endDate, cell: selectedCell }));
        setPopupVisible(false);
    };
const [dayEvents, setDayEvents] = useState([{events:[],index:"",hour:"",Eventdate:""}]);

useEffect(() => {
    const newDayEvents = currenWeekprops[0].map((element,ind) => {
      const events = filteredEvents.filter(
        (evt) =>
          dayjs(evt.day).format("DD-MM-YY") === element.format("DD-MM-YY")
      );
      
      const date = new Date(element.toISOString());


let EventsDate = date.getUTCDate().toString()
let EventMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)

      return { events: events, index: ind, hour: date.getUTCHours(),Eventdate:EventsDate+" "+EventMonth };
    });
    setDayEvents(newDayEvents);
  }, [currenWeekprops, filteredEvents]);
  
    return (
        <div className={`overflow-scroll ${styled.weekContainer}`}>
            <table className="table-auto mt-8">
                <thead className="text-start" style={{ borderBottom:" 1px solid #413E3E"}}>
                    <tr className="text-start" >
                        <th className="text-start" ></th>
                        {hours.map((hour) => (
                            <th key={hour} className="py-4 h-24 whitespace-nowrap"style={{minWidth:"24rem",fontSize:"1.2rem",textAlign:"start"}} >
                                {hour}:00 am
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
    {days.map((day, ind) => (
        <tr key={day} 
        onClick={()=>{
          setDaySelected(currenWeekprops[0][ind]);

        }}
        >
            <td className={styled.weekBorder_2}>{day}</td>
            {hours.map((hour) => (
                <td
                    key={`${day}-${hour}`}
                    onClick={() => handleClick(day, hour)}
                    className={styled.weekBorder_3}
                >
                    {dayEvents && dayEvents.map((dayEveele) => {
                        if (dayEveele.index === ind) {
                            if (dayEveele.hour === hour) {
                                return dayEveele.events.map((dayEleEvents, index) => (
                                    <div key={index} className={styled.EventContainer}  
                                    
                                    onClick={()=>{
                                        setSelectedEvent(dayEleEvents)
                                    }}>
                                        <div>
                                            <div style={{marginBottom:".6rem",fontSize:"1rem"}}>{dayEleEvents.title}</div>
                                            <div><div style={{width:"2rem",height:"2rem",borderRadius:"1rem",border:"1px solid"}}></div></div>
                                        </div>
                                        <div>
                                        <div style={{marginBottom:".6rem",fontSize:"1rem"}}>{dayEveele.Eventdate}:{dayEveele.hour}am(IST)</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                           <div></div>
                                           <div style={{display:"flex",alignItems:"center"}}>
                                           <div><img src={share} alt="dasdas" style={{width:"1.2rem",height:"1.2rem",marginRight:"1rem"}}/></div>
                                           <div><img src={bell} alt="dasdas" style={{width:"1.2rem",height:"1.2rem",}}/></div>
                                           </div>
                                        </div>
                                            
                                        </div>
                                    </div>
                                ))
                            } else {
                                return ""
                            }
                        }
                        else {
                            return ""
                        }
                    })}
                </td>
            ))}
        </tr>
    ))}
</tbody>

            </table>

            {popupVisible && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6">
                        <h2 className="text-lg font-medium mb-4">Add Event</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="eventName">
                                    Event Name
                                </label>
                                <input
                                    className="border border-gray-400 p-2 w-full"
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="startDate">
                                    Start Date
                                </label>
                                <input
                                    className="border border-gray-400 p-2 w-full"
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2" htmlFor="endDate">
                                    End Date
                                </label>
                                <input
                                    className="border border-gray-400 p-2 w-full"
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mr-2"
                                    type="submit"
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
                                    type="button"
                                    onClick={handlePopupClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}



