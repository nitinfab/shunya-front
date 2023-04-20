
import React, { useEffect, useState } from "react";
import cross from "../../../../../../../../assets/cross.svg";
import network from "../../../../../../../../assets/network.svg";
import Urgent from "../../../../../../../../assets/urgentPrio.svg";
import Mid from "../../../../../../../../assets/midPrio.svg";
import Low from "../../../../../../../../assets/lowPrio.svg";
import High from "../../../../../../../../assets/highPrio.svg";

import styled from "./CardInfo.module.css";

function CardInfo(props) {
  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];
  const [values, setValues] = useState({
    ...props.card,
  });
  const[newTask,setNewTask]=useState(false);
  const[newCardData,setNewCardData]=useState({
    name:values.name,
    description:values.desc,
    priority:values.priority,
    cardStatus:true,
      })
  const [selectedColor, setSelectedColor] = useState();
  
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);

    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setValues({
      ...values,
      tasks: [...values.tasks, task],
    });
  };

  const removeTask = (id) => {
    const tasks = [...values.tasks];

    const tempTasks = tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const tasks = [...values.tasks];

    const index = tasks.findIndex((item) => item.id === id);
    if (index < 0) return;

    tasks[index].completed = value;

    setValues({
      ...values,
      tasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks?.filter((item) => item.completed)?.length;
    return (completed / values.tasks?.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;

    setValues({
      ...values,
      date,
    });
  };

  // useEffect(() => {
  //   if (props.updateCard) props.updateCard(props.boardId, values.id, newCardData);
  // }, [values]);

//   useEffect(()=>{
// console.log("CARDDADARDRDAINFOOOOEE",values)

//   },[])
  function UpdateCardFunc(){
   
    if (props.updateCard) props.updateCard(props.boardId, values._id, newCardData);
    // setTimeout(()=>{
    //   props.onClose ? props.onClose() : null
    // })
    props.onClose()
    
  }    ////////////////////////////////////////////   4
  const [selectedValues4, setSelectedValues4] = useState([]);
  const [selectedDropdownIndex4, setSelectedDropdownIndex4] = useState(null);
  const [dropdownState4, setDropdownState4] = useState([]);
  const [toggstate4, settoggstate4] = useState(false);


  const handleOptionSelect4 = (option, index) => {

    
    let TargetedTicketTask;
    setSelectedValues4((prevState) => {
    const newValues = [...prevState];
    newValues[index] = { value: option, image: getImageForOption1(option) };

    // let updateArray = [...values];
    // const updatedTask = updateArray.map((task) => {
    //   if (
    //     task.title ===
    //     pageName[5].charAt(0).toUpperCase() + pageName[5].slice(1)
    //   ) {
    //     return {
    //       ...task,
    //       cards: task.cards.map((card, ind) => {
    //         if (ind === index) {
          
    //           TargetedTicketTask = card._id;
    //           return {
    //             ...card,
    //             priority: newValues[index].value,
    //           };
    //         }
    //         return card;
    //       }),
    //     };
    //   }
    //   return task;
    // });
    // const updatedTask1 = updatedTask.map((task) => {
    //   if (task.title === "All") {
    //     return {
    //       ...task,
    //       cards: task.cards.map((card, ind) => {
    //         if (card._id === TargetedTicketTask) {
           
    //           TargetedTicketTask = card._id;
    //           return {
    //             ...card,
    //             priority: newValues[index].value,
    //           };
    //         }
    //         return card;
    //       }),
    //     };
    //   }
    //   return task;
    // });
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

  useEffect(() => {
  
    setSelectedValues4(
        [values].map((ele, ind) => ({
          image: getImageForOption1(ele.priority),
          value: ele.priority,
        }))
    );

    setDropdownState4(
      [values].map(() => false)
    );
  }, []);


  useEffect(()=>{
  setNewCardData({...newCardData,priority:selectedValues4[0]?.value})


  },[selectedValues4[0]?.value])
  return (
    <div
    className={styled.modal}
    onClick={() => (props.onClose ? props.onClose() : "")}
    style={{zIndex:5}}
  >
     {true ? (
     
          <div className={styled.editable1_sub1}   
          onClick={(e) => e.stopPropagation()}
          >
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
              <div>Update Card</div>
              <div
                className={styled.crossStyle1}
                onClick={() => (props.onClose ? props.onClose() : "")}

              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                 UpdateCardFunc();

            }} >
              <input
                type="text"
                defaultValue={newCardData.name}
                name="name"
                onChange={(e)=>{
  setNewCardData({...newCardData,[e.target.name]:e.target.value})
                }}
                className={styled.editinputStyle}
                placeholder="Task Name ..."
                style={{ resize: "none", padding: "1rem" }}
                autoFocus
              />
                 <input
                type="text"
                defaultValue={newCardData.description}
                name="description"
                onChange={(e)=>{
                  setNewCardData({...newCardData,[e.target.name]:e.target.value})
                }}
                className={styled.editinputStyle}
                placeholder="Add Description  ..."
                style={{  padding: "1rem" }}
              />
          <div
          style={{
            display: "flex",
            height:"2rem",
            alignItems: "center",
            justifyContent: "space-between",
            margin:"1.5rem 0rem" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center",}}>

           {/* /////////////////////// */}
            {/* /////////////////////// */}
            {/* /////////////////////// */}
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
                          ].map((option) => {
                              return (
                                <li
                                  key={option.value}
                                  onClick={() =>
                                    handleOptionSelect4(option.value, 0)
                                    
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
                          })}
                        </ul>
                      )}
                    </div>

{}




            {/* /////////////////////// */}
            {/* /////////////////////// */}
            {/* /////////////////////// */}
            <div style={{ margin: "0rem 1rem" }} className={styled.semiCircle2}>
              <span>Issues</span>
              <span>2</span>
            </div>
            <div>
              <div className={styled.semiCircle3}>
                <span
                  style={{
                    color: "#fff",
                    fontSize: "2.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  .
                </span>
                <span>Feature</span>
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
              <span>2</span>
            </div>
          </div>
          <div  className={styled.semiCircle1}>
            <span
              style={{
                width: ".8rem",
                height: ".8rem",
                borderRadius: ".5rem",
                border: ".3px solid ",
              }}
            ></span>
            <span>3</span>
          </div>
        </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1.5rem 0rem",
                  height: "3.5rem",
                }}
              >
                <div></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button type="submit" className={styled.AddStyle}  
                  
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
       
      ) : (
        ""
      )}
    </div>
  );
}

export default CardInfo;



/*




*/
