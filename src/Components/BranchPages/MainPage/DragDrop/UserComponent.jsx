import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from "../mainstyle.module.css";
import threeDot from "../../../../assets/threeDot.svg";
import cross from "../../../../assets/cross.svg";
import Urgent from "../../../../assets/urgentPrio.svg";
import Mid from "../../../../assets/midPrio.svg";
import Low from "../../../../assets/lowPrio.svg";
import High from "../../../../assets/highPrio.svg";
import Plus_icon from "../../../../assets/Plus_icon.svg";
import rightarrow from "../../../../assets/rightarrow.svg";
import downArrow from "../../../../assets/downArrow.svg";


import React, { useEffect, useRef, useState } from 'react';
import RichText from './RichText';
import { useSelector } from 'react-redux';

const UserComponent = ({
    id,
    name,
    itemLength,
    setNewTask,
    newTask,

}) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: id })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
  
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? '2px 2px 4px rgba(77, 79, 98, 0.4)' : "",
        width: "44.47%",
        height: "35rem",
        marginTop:"2.5rem",
        background:
          "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
        border: "0.5px solid #7F7575",
        backdropFilter: "blur(10px)",
  
        borderRadius: "4px",

    
    }
    const style1 = {
      transition,
      transform: CSS.Transform.toString(transform),

      opacity: isDragging ? 0.5 : 1,
      boxShadow: isDragging ? '2px 2px 4px rgba(77, 79, 98, 0.4)' : "",
      width: "100%",
      height: "35rem",
      marginTop:"2.5rem",
      background:
        "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
      border: "0.5px solid #7F7575",
      backdropFilter: "blur(10px)",

      borderRadius: "4px",

  
  }

  const [divStates, setDivStates] = useState([]);

  // for (let i = 1; i <= itemLength; i++) {
  //   setDivStates({...divStates,id:i,state:false})
  // }
    const [value, setValue] = useState("");
  const [addTask, setAddTask] = useState(false);
  const pageName = window.location.pathname.split("/");

  const [toggleState,setToggleState]=useState(false)
  const [toggleState1,setToggleState1]=useState(false)
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);

////////////////////////////////////////////
const [domainDetail3, setDomainDetail3] = useState(
 
  JSON.parse(localStorage.getItem("mytask"))?.find(obj => obj.title === "All")?.cards.filter(card => card.status === "To_do")||[]
);
const [selectedTask,setSelectedTask]=useState([]
);

const handleWorkSpaceClick = (event) => {
let taskData= JSON.parse(localStorage.getItem("mytask"))
setSelectedTask(
  myTaskStateValue.find(obj => obj.title === "All").cards.filter(card => card.status === event.target.className)
)
setDomainDetail3(
  myTaskStateValue.find(obj => obj.title === "All").cards.filter(card => card.status === event.target.className)
  )
  setSelectedDrop(event.target.className)

};
const handleWorkSpaceClick1 = (event) => {
  const clickedElementId = event.target.parentNode.id;
  console.log("dgdgdf34534",clickedElementId)
  // setChoiceClass((prevState) =>
  //   prevState === clickedElementId ? false : clickedElementId
  // );
 };
      ////////////////////////////////////////////   4
  const [selectedValues4, setSelectedValues4] = useState([]);
  const [selectedDropdownIndex4, setSelectedDropdownIndex4] = useState(null);
  const [dropdownState4, setDropdownState4] = useState([]);
  const [selectedDrop,setSelectedDrop]=useState("To_do")
  const [toggstate4, settoggstate4] = useState(false);
  useEffect(() => {
    setSelectedValues4(
      domainDetail3.map((ele, ind) => ({
        image: getImageForOption1(ele.priority),
        value: ele.priority,
      }))
    );
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


  useEffect(() => {
    const fetchProject = async () => {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));
      if (tokenObject.tokenStatus === "manual") {
        res = await fetch(`http://localhost:8000/user/fetchDetail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: tokenObject.tokenGen,
            status: tokenObject.tokenStatus,
          }),
        });
      } else {
        res = await fetch(`http://localhost:8000/user/fetchDetail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "google",
          }),
          credentials: "include",
        });
      }
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Yes Project Name Successfully Updated", data.status);
        if(myTaskStateValue.length>1){
          setSelectedTask(
            myTaskStateValue.find(obj => obj.title === "All").cards.filter(card => card.status === "To_do")
          )
          setDomainDetail3(
            myTaskStateValue.find(obj => obj.title === "All").cards.filter(card => card.status === "To_do")
            )
        }
        else
     {   setSelectedTask( 
      data.updatedUser.projects.find((ele, ind) => {
        if (ele.projectName == pageName[2]) return ele;
      }).myTask.find(obj => obj.title === "All").cards.filter(card => card.status === "To_do")
        ); 
        setDomainDetail3(
          data.updatedUser.projects.find((ele, ind) => {
            if (ele.projectName == pageName[2]) return ele;
          }).myTask.find(obj => obj.title === "All").cards.filter(card => card.status === "To_do")
          )
      }
      }
    };
    fetchProject();
  }, []);
    return (
      <>
       {id==3?   <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            <div  style={{
            height: "4rem",
            padding: "1rem",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div style={{ fontSize: "1.3rem" }}>{name}</div>
          <div
            style={{ display: "flex", fontSize: "2rem", alignItems: "center",gap:"3rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <img src={threeDot} alt="cross" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img src={cross} alt="cross" />
              </div>
            </div>
          </div>

          </div>
        <div className={styled.dragCard}></div>

        </div>
        :
         id==1?
         <div
            ref={setNodeRef}
            {...attributes}
            // {...listeners}
            style={style}
        >
            <div  style={{
            height: "4rem",
            padding: "1rem",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
            position:"relative"
          }}>
        <div style={{display:"flex",alignItems:"center",}}> 
        <div style={{ fontSize: "1.3rem" ,marginRight:"2rem"}}>{name}</div>
        <div style={{position:"relative",display:"flex",alignItems:"center",gap:"1rem"}} 
         onClick={()=>{
            setToggleState(!toggleState)
          }}
        >
          <div 
         
          > {selectedDrop}</div>
          <div style={{marginTop:".3rem"}}>
            <img src={downArrow} alt="downArrow" style={{width:"1.2rem",height:"1.2rem"}} />
          </div>
        </div>
        </div>
          <div
            style={{ display: "flex", fontSize: "2rem", alignItems: "center" ,gap:"3rem" }}
          >
            <div
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div   onClick={()=>{
                setToggleState1(!toggleState1)
              }}>
                <img src={threeDot} alt="cross" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img src={cross} alt="cross" />
              </div>
            </div>
          </div>

          </div>
        <div className={styled.dragCard} style={{position:"fixed"}} id={id}>  
        {toggleState?<div className={styled.dropDown1} >
      {["To_do","In_Progress", "Backlog", "Done"].map((ele, ind) => {
        return (
          <div>
            {ind == 0 ? (
              ""
            ) : (
              <div
                style={{
                  width: "100%",
                  border: ".1px solid #413E3E",
                  // margin: "1rem 0rem",
                }}
              ></div>
            )}
              {ele==selectedDrop?"": <div
              style={{
                height: "2.5rem",
                fontSize: ".9rem",
                display: "flex",
                alignItems: "center",
                cursor:"pointer"
              }}
              className={ele} 
            
              onClick={(e)=>{
                handleWorkSpaceClick(e)
                setToggleState(false)
              }}
            >
              {ele}
            </div>}
          </div>
        );
      })}
    </div>:""}
    {toggleState1?<div className={styled.dropDown2} >
      {["Fulll Size","Half size", "Delete"].map((ele, ind) => {
        return (
          <div>
            {ind == 0 ? (
              ""
            ) : (
              <div
                style={{
                  width: "100%",
                  border: ".1px solid #413E3E",
                  // margin: "1rem 0rem",
                }}
              ></div>
            )}
            <div
              style={{
                height: "2.5rem",
                fontSize: ".9rem",
                display: "flex",
                alignItems: "center",
                cursor:"pointer"
              }}
              className={ele} 
            
              onClick={(e)=>{
                handleWorkSpaceClick1(e)
                setToggleState1(false)
              }}
            >
              {ele}
            </div>
          </div>
        );
      })}
    </div>:""}
    <div style={{height:"25rem",overflow:"scroll",}}>
      {selectedTask?.map((ele,ind)=>{
 return <div style={{display:"flex",justifyContent:"space-between"}}>
<div style={{display:"flex",alignItems:"center",marginBottom:"2rem"}}>
<div style={{marginRight:"2rem"}}>
<img
                          src={selectedValues4[ind]?.image}
                          alt=""
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
</div>
 <div>{ele.name}</div>
 <div>
  <img src={rightarrow} alt="rightarro" style={{margin:"0rem 1rem"}} />
 </div>
 <div>Notification</div>
 <div>
 <img src={rightarrow} alt="rightarro" style={{margin:"0rem 1rem"}} />

 </div>
 <div>Project name</div>

 <div>
 <img src={rightarrow} alt="rightarro" style={{margin:"0rem 1rem"}} />

 </div>
</div>
<div style={{marginTop:".4rem"}} >
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
                      <span>
                        {
                          ele.tasks[0]?.subtask.filter((ele, ind) => {
                            if (ele.status === "Done") {
                              return ele;
                            }
                          }).length
                        }
                        /{ele.tasks[0]?.subtask.length}
                      </span>
                    </div>
</div>
 </div>
      })}
    </div>
<div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center",cursor:"pointer"}} 

>
<img src={Plus_icon} alt="Plus_icon"  

onClick={()=>{
 setNewTask(!newTask)
}}
/>
</div>

        </div>
        </div>
        :
         
         
              <div
            ref={setNodeRef}
            {...attributes}
            // {...listeners}
            style={style}
        >

<div style={{
            height: "4rem",
            padding: "1rem",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}>
          <div style={{ fontSize: "1.3rem" }}>{name}</div>
          <div
            style={{ display: "flex", fontSize: "2rem", alignItems: "center",gap:"3rem"  }}
          >
            <div
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <img src={threeDot} alt="cross" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img src={cross} alt="cross" />
              </div>
            </div>
          </div>

          </div>
        <div className={styled.dragCard}>
<RichText></RichText>

        </div>

</div>
      
        }

</>
    )
}

export default UserComponent;
