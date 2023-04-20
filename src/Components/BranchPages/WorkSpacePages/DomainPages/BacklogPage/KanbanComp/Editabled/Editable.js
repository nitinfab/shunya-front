import React, { useState } from "react";

import cross from "../../../../../../../assets/cross.svg";
import network from "../../../../../../../assets/network.svg";

import Plus_icon from "../../../../../../../assets/Plus_icon.svg";

import styled from "./Editable.module.css";

function Editable(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText1, setInputText1] = useState(props.defaultValue || "");
  const [inputText, setInputText] = useState({
    taskName:"",
    description:""
  });

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText.taskName,inputText.description);
    }
    setIsEditable(false);
  };
  const submission1 = (e) => {
    e.preventDefault();
    // if (inputText1 && props.onSubmit1) {
      // setInputText("");
      props.onSubmit1(inputText1);
    // }
    setIsEditable(false);
  };
  function handleTextareaInput(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  return (
    <>
      {props.boardStatus === "true" ? (
        <div className={styled.editable}>
          {isEditable ? (
           <div>
           <form className={styled.editable_edit} onSubmit={submission1}>
              <input
                  type="text"
                  defaultValue={inputText1}
                  className={styled.editinputStyle}
                  placeholder="Add Board"
                  style={{padding:"1rem"}}
                  onChange={(event) => setInputText1(event.target.value)}
                  autoFocus
              />
              <div className={styled.editable_edit_footer}>
             <div></div>
             <div style={{display:"flex",height:"100%"}}>
             <div className={styled.crossStyle} 
                    onClick={() => setIsEditable(false)}
             
             >
                  <img
                    src={cross}
                    alt="cross"
                    className={styled.closeIcon}
                  />
                </div>
                <button type="submit" 
                          className={styled.AddStyle}
                style={{marginLeft:"2rem",backgroundColor:"transparent",border:"0.428571px solid #413e3e"}}
                >Add</button>
             </div>
               
              </div>
            </form>
           </div>
          ) : (
            <p
              
              className={styled.editable_display1}
              onClick={() => setIsEditable(true)}
            >
             <div className={styled.dottedStyle}>
             <img
                src={Plus_icon}
                alt="Plus_icon"
                style={{ width: "2rem", height: "2rem" }}
              />
             </div>
            </p>
          )}
        </div>
      ) : (
        <div className={styled.editable1}>
          {isEditable ? (
            <div className={styled.editable1_sub} >
            <div className={styled.editable1_sub1}   
            style={{height:"auto"}}
            > 
            <div style={{display:"flex",marginTop:"1rem",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"1.8rem"}}>
              <div>New Task</div>
              <div className={styled.crossStyle1}  
                          onClick={() => setIsEditable(false)}
                    >
                    
                        <img
                          src={cross}
                          alt="cross"
                          className={styled.closeIcon}
                          style={{width:"1rem",height:"1rem"}}
                        />
                   
                    </div>
            </div>
              <form  onSubmit={submission}>
                <input
                  type="text"
                  defaultValue={inputText.taskName}
                  className={styled.editinputStyle}
                  name="taskName"
                  placeholder="Issue title"
                  style={{resize:"none",padding:"1rem"}}
                  onChange={(e) => setInputText({...inputText,[e.target.name]:e.target.value})}
                  autoFocus
                />
                <textarea
                  type="text"
                  defaultValue={inputText.description}
                  onInput={handleTextareaInput}
                  className={styled.editinputStyle}
                  name="description"
                  style={{resize:"none",padding:"1rem"}}
                  onChange={(e) => setInputText({...inputText,[e.target.name]:e.target.value})}
                  placeholder="Add description..."
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
            <div>
              <img
                src={network}
                alt="network"
                style={{ height: "1.8rem", width: "1.8rem" }}
              />
            </div>
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
                    {/* <div
          style={{
            display: "flex",
            height:"2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <img
                src={network}
                alt="network"
                style={{ height: "1.8rem", width: "1.8rem" }}
              />
            </div>
            <div style={{ margin: "0rem 1rem" }} className={styled.semiCircle2}>
              <span>Issues</span>
              <span>2</span>
            </div>
            <div>
              {" "}
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
        </div> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop:"1rem",
                    height:"3.5rem",
                  }}
                >
                  <div></div>
                  <div style={{ display: "flex", alignItems: "center",height:"100%" }}>
                    
                        <button
                          type="submit"
                          className={styled.AddStyle}
                          style={{minHeight:"3rem"}}
                        >
                          Add
                        </button>
                  </div>
                </div>
              </form>
              </div>
      
            </div>
          ) : (
            <p
              // style={{ zIndex: 4 }}
              // className={styled.editable_display}
              onClick={() => setIsEditable(true)}
              style={{display:"flex",alignItems:"center"}}
            >
              <img
                src={Plus_icon}
                alt="Plus_icon"
                style={{ width: "2rem", height: "2rem" }}
              />
              <div style={{fontSize:"1.5rem",marginLeft:"1.5rem",minHeight:"3rem"}}>Add Task</div>
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Editable;
