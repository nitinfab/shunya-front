import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import cross from "../../../../assets/cross.svg";
import styled from "../CalendarStyle.module.css";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center"
      style={{zIndex:5}}
    >
      <form className={styled.eventMoalContainer}>
        <header
          className={styled.eventModalHeader}
        >
          <span style={{fontSize:"2rem"}}>Calendar</span>
          <div style={{display:"flex",alignItems:"center",gap:"1.5rem" }}>
            {selectedEvent && (
              <div
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                <i class="fa-solid fa-trash-can"></i>
              </div>
            )}
            <button onClick={() => setShowEventModal(false)}>
              {/* <span className="material-icons-outlined text-gray-400">
                
              </span> */}
              <img src={cross} alt="ddasdasd" />
            </button>
          </div>
        </header>
        <div style={{marginTop:"1rem"}} >
        <div style={{ border: ".25px solid #413E3E" }}></div>
      </div>
        <div style={{marginTop:"1.5rem" }}>
           <div style={{display:"flex",flexDirection:"column"}}>
            <input
              type="text"
              name="title"
              value={title}
              required
              placeholder="Add title"
              onChange={(e) => setTitle(e.target.value)}
              className={styled.editinputStyle}
              style={{ resize: "none", padding: "1rem" }}
              autoFocus
            />
           </div>

            <div style={{minHeight:"4rem",marginTop:"1.5rem"}}>
            <span className="material-icons-outlined text-gray-400" style={{fontSize:"1.6rem",color:"#fff"}}>
              Schedule
            </span>
            <p style={{fontSize:"1.2rem"}}>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
          <div style={{marginTop:"1.5rem"}}>
          {/* <div style={{height:"3rem",fontSize:"1.4rem",}} >
              Segment    
            </div> */}
        
<input
              type="text"
              name="description"
              placeholder="Add a description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styled.editinputStyle}
              style={{ resize: "none", padding: "1rem" }}
            />
          </div>
            <div style={{height:"3rem",display:"flex",alignItems:"center",fontSize:"1.4rem",marginTop:"1.5rem",}}>
              Bookmark_Border
            </div>
            <div style={{display:"flex",gap:"1rem",marginTop:"1rem"}}>
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                    <i class="fa-solid fa-check"></i>
                    </span>
                  )}
                </span>
              ))}
          </div>
        </div>
        <footer style={{marginTop:"1.5rem",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div></div>
          <button type="submit" className={styled.AddStyle}
            onClick={handleSubmit}
            style={{minHeight:"3rem"}}
          >
          Save
                  </button>
        </footer>
      </form>
    </div>
  );
}
