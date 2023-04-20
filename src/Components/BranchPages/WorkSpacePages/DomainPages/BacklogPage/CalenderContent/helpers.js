// {
//     start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
//     end: new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         2,
//         12,
//         28
//     ),
//     name: "Idea",
//     id: "Task 0",
//     progress: 45,
//     type: "task",
//     project: "ProjectSample"
// }

// import { useSelector } from "react-redux";
// export const useDomainTask = () => {
//     const domainTask = useSelector((state) => state.domainTask);
//     return domainTask;
//   };
import UseDomainTask from "./UseDomainTask";
export const initTasks = () => {
    // const domainSwitch = useSelector((state) => state.domainTask);
  const pageName = window.location.pathname.split("/");
    let tasks;
    const values = UseDomainTask();
    const currentDate = new Date();
          ////////   TAsk
          if(values.domainTask.domainId!=""){
            let tty = [...values.workSpaceStateValue];
             tasks = tty?.find((ele, ind) => {
              if (ele.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1))
                return ele;
            })?.cards.find((ele, ind) => {
              if (ele._id == values.domainTask.domainId)
                return ele;
            }).tasks.map((ele) => ele).find(
              (ele) =>
                ele.title == pageName[8].charAt(0).toUpperCase() + pageName[8].slice(1)
            );
            
            let modifiedCards = tasks?.cards.map((ele, ind) => {
              let modifiedEle = {...ele}; // create a copy of the object
              modifiedEle.start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
              modifiedEle.end = new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0);
              return modifiedEle;
            });
            
            tasks=modifiedCards

}
          ///////////   Domain
    else{
           if(values.pageNameValue ==="mytask"){
            let tty=[...values.myTaskStateValue]
             tasks = tty?.find(
                (ele) => ele.title == pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
              )?.cards?.map((ele,ind)=>{
                return {
                  ...ele,
                  start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
                  end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0)
                };
              })

           }
           else{
            let tty=[...values.workSpaceStateValue]
            tasks = tty?.find(
               (ele) => ele.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
             )?.cards?.map((ele,ind)=>{
               return {
                 ...ele,
                 start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
                 end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0)
               };
             })

           }
    }
      return tasks
  }
  
  export const getStartEndDateForProject = (tasks, projectId) => {
      const projectTasks = tasks.filter(t => t.project === projectId)
      let start = projectTasks[0].start
      let end = projectTasks[0].end
  
      for (let i = 0; i < projectTasks.length; i++) {
          const task = projectTasks[i]
          if (start.getTime() > task.start.getTime()) {
              start = task.start
          }
          if (end.getTime() < task.end.getTime()) {
              end = task.end
          }
      }
      return [start, end]
  }

    // const tasks = [
    
    //     {
    //         start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    //         end: new Date(
    //             currentDate.getFullYear(),
    //             currentDate.getMonth(),
    //             2,
    //             12,
    //             28
    //         ),
    //         name: "Idea",
    //         id: "Task 0",
    //         progress: 45,
    //         type: "task",
    //         project: "ProjectSample"
    //     },
    //     {
    //         start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
    //         end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
    //         name: "Research",
    //         id: "Task 1",
    //         progress: 25,
    //         dependencies: ["Task 0"],
    //         type: "task",
    //         project: "ProjectSample"
    //     },
     
    // ]





/*

export const getStartEndDateForProject = (tasks, projectId) => {
    const projectTasks = tasks.filter(t => t.project === projectId)
    let start = new Date(projectTasks[0].start).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(projectTasks[0].start).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})
    let end = new Date(projectTasks[0].end).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(projectTasks[0].end).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'})
    for (let i = 0; i < projectTasks.length; i++) {
        const task = projectTasks[i]
        if (start.getTime() > new Date(task.start).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(task.start).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'}).getTime()) {
            start = new Date(task.start).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(task.start).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'}).getTime()
        }
        if (end.getTime() < new Date(task.end).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(task.end).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'}).getTime().getTime()) {
            end = new Date(task.end).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata'}) + ' ' + new Date(task.end).toLocaleTimeString('en-US', {hour12: false, timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'}).getTime()
        }
    }
    return [start, end]
}

*/