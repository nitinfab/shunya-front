import React, { useEffect, useState } from "react";
import styled from "./domainTaskStyle.module.css";

import rect from "../../../../assets/Rectangle.svg";
import doc from "../../../../assets/doc.svg";


import projectAdd from "../../../../assets/projectAdd.svg";
function DomainTaskOver() {

  const [height, setHeight] = useState("3rem");
  const [projectOver,setProjectOver]=useState(
    JSON.parse(localStorage.getItem("overview")) ||
    {
      pro:"Welcome to Shunya 👋",
      descip:"Hi there. Complete these issues to learn how to use Shunya and discover ✨ProTips. When you're done, delete them or move them to another team for others to view.To start, type C to create your first issue.Create issues from any view using C or by clicking the New issue button",
    } 
     
    
 )
  const [proOverview, setProOverview] = useState(JSON.parse(localStorage.getItem("overview")));
  const [descip, setDescip] = useState();
  function handleChange(e){
setProjectOver({...projectOver,[e.target.name]:e.target.value})
localStorage.setItem("overview",JSON.stringify({...projectOver,[e.target.name]:e.target.value}))

  }
  const [projectInitiation, setProjectInitiation] = useState([
    {
      name: "Nitin Sharma",
      task: "Build team",
      time: "2 week ago",
    },
    {
      name: "Ritik Sharma",
      task: "Build team",
      time: "3 week ago",
    },
  ]);
  function fileSaver(e) {
    let files = e.target.files;
    console.log("qhuh324u23yu4y32", files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("asjkdashd789", e.target.result);
    };
  }

  useEffect(() => {
  // if(!JSON.parse(localStorage.getItem("overview")).pro){
// localStorage.setItem("overview",JSON.stringify(projectOver))

  // }
  },[]);
  function handleTextareaInput(event) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  function handleTextareaInput1(event) {

    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setHeight(`${textarea.scrollHeight}px`);
  }
  useEffect(() => {
    const textarea = document.querySelector(".textarea");
    textarea.style.height = `${textarea.scrollHeight}px`;
    setHeight(`${textarea.scrollHeight}px`);
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          fontSize: "1.6rem",
          position:"relative"
        }}
      >
        {/* /////// Section 1 */}
        <div style={{ width: "68%",  color: "#fff",marginTop:"2rem" }}>
            <textarea
              type="text"
              defaultValue={projectOver.pro}
    onInput={handleTextareaInput1}
              name="pro"
              onChange={(e)=>{
                handleChange(e)
              }}
              className="textarea"
              style={{ height: height,resize:"none",width:"100%",padding:"1rem",backgroundColor:"transparent" }}
              // className={styled.para1}
            ></textarea>
            <textarea
              // ref={textAreaRef}
    onInput={handleTextareaInput}
              type="text"
              name="descip"
              onChange={(e)=>{
                handleChange(e)
              }}
              defaultValue={projectOver.descip}
              className={styled.para2}
              style={{fontSize:"1.4rem"}}
            ></textarea>
          <div style={{ margin: "2rem 0rem" }}>
            <div style={{ marginBottom: "2rem" }}>Files & Links</div>
            {/* <input type="file" name="file" onChange={(e)=>{
fileSaver(e)
    }}></input> */}
            <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styled.fileButton}>+</div>

            {[1,2].map((ele,ind)=>{
              return   <div className={styled.docContainer}>
                <div>
                  <img src={doc} alt="documnet" />
                </div>
                <div>
                  <div>Photos</div>
                  <div style={{color:"#7f7575"}}>doc.google.com</div>
                </div>
              </div>
            })}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "2rem" }}>Project Timeline</div>

            <div style={{ display: "flex" }}>
              <div>
                <img src={rect} alt="rectangle" />
              </div>
              <div style={{ marginLeft: "2rem" }}>Project Initiation</div>
            </div>
            <div>
              {projectInitiation &&
                projectInitiation.map((ele, index) => {
                  return (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        key={index}
                        style={{
                          height: "2.5rem",
                          width: ".1rem",
                          border: ".5px solid #7F7575",
                          marginLeft: "1rem",
                        }}
                      ></div>

                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div>
                          <img
                            src={projectAdd}
                            alt="projectAdd"
                            style={{ marginLeft: ".3rem" }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginLeft: "4.4rem",
                            width: "48rem",
                          }}
                        >
                          <div style={{ display: "flex" }}>
                            <div>{ele.name}</div>
                            <div
                              style={{ color: "#7f7575", margin: "0rem .4rem" }}
                            >
                              created a task
                            </div>
                            <div>{ele.task}</div>
                          </div>
                          <div style={{ color: "#7f7575" }}>{ele.time}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                height: "2.5rem",
                width: ".1rem",
                border: ".5px solid #7F7575",
                marginLeft: "1rem",
              }}
            ></div>
            <div style={{ display: "flex" }}>
              <div>
                <img src={rect} alt="rectangle" />
              </div>
            </div>
          </div>
        </div>

        {/* //////// Section 2 */}
        {/* <div
          style={{
            width: "32%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <div
            style={{ alignSelf: "flex-start", marginTop: "1rem",marginRight:"1.2rem" }}
            onClick={() => {
              setDeatilTab(!detailTab);
            }}
          >
            <img src={dash2} alt="dashboard" style={{width:"1.8rem", height:"1.8rem"}}/>
          </div>
        </div> */}
      
      </div>

    </>
  );
}
export default DomainTaskOver