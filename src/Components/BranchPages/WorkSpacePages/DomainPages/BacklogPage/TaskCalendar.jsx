import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import data from "./TaskCalendatItems/data.json"
// import Grid from './TaskCalendatItems/Grid';
import Tasks from './TaskCalendatItems/Tasks';
import TimeTable from './TaskCalendatItems/TimeTable';

function GanttChart() {
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const pageName = window.location.pathname.split("/");

  const [tasks, setTasks] = useState(data?.tasks);
  const [taskDurations, setTaskDurations] = useState(data?.taskDurations);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: '2023',
    toSelectMonth: 1,
    toSelectYear: '2025',
  });
  ///////////////////////   My Data
  const [tasks1, setTasks1] = useState(myTaskStateValue );
  const [taskDurations1, setTaskDurations1] = useState(myTaskStateValue?.find((ele,ind)=>{
    if(ele.title == "All"){
      return ele;
    }
  })?.cards);

useEffect(()=>{
  setTasks1(myTaskStateValue)
setTaskDurations1(myTaskStateValue?.find((ele,ind)=>{
  if(ele.title == "All"){
    return ele;
  }
})?.cards)
},[myTaskStateValue])


  return (
    // <div id="gantt-container">
    <div id="gantt-container">
      <div style={{display:"grid",gridTemplateColumns:"150px 1fr ",
      borderRadius:"5px",  boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.05)",
      }}>
        <Tasks
          tasks={tasks1}
          setTasks={setTasks1}
          setTaskDurations={setTaskDurations}
        />
   <TimeTable
          timeRange={timeRange}
          tasks={tasks1}
          taskDurations={taskDurations1}
          setTaskDurations={setTaskDurations}
        />
      </div>
 

      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #4be35a;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          {/* --color-outline: #e9eaeb; */}
          --border-radius: 5px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}

export default GanttChart;
