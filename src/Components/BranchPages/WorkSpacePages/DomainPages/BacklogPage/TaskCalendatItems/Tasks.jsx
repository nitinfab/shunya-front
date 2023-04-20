import React, { useEffect, useRef } from 'react';
import styled from './taskCalendarStyle.module.css';

function Tasks({ tasks, setTasks, setTaskDurations }) {
  const inputRef = useRef([]);
  const indexRef = useRef(null);

  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    const newTasks = tasks.filter((task) => task._id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);

    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  }

  function onChange(e, i) {
    const { value } = e.target;
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    indexRef.current = i;

    let newTasks = tasks.filter((task) => task._id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }

  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  }, [tasks, indexRef]);

  return (
    <div  className={styled.gantt_grid_container__tasks}>
      <div className={styled.gantt_task_row}></div>
      <div className={styled.gantt_task_row}></div>
      <div className={styled.gantt_task_row}></div>
      {tasks &&
        tasks.map((tsk, i) => (
          <div
            key={`${i}-${tsk?._id}-${tsk.title}`}
            className={styled.gantt_task_row}
            style={{ minHeight: '50px' }}
          >
            <input
              data-task-id={tsk?._id}
              value={tsk?.title}
              onChange={(e) => onChange(e, i)}
              ref={(el) => (inputRef.current[i] = el)}
            />
            {/* <button type="button" data-task-id={tsk?._id} onClick={handleDelete}>
              x
            </button> */}
          </div>
        ))}
    </div>
  );
}

export default Tasks;
