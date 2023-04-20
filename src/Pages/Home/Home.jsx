import React, { useEffect, useRef, useState } from "react";
import Branch from "../../Components/BranchFolder/Branch";
import styled from "../../Components/DashStyle.module.css";
import Title from "../../Components/BranchFolder/Title";
import { Outlet, useNavigate } from "react-router";
import imageIs from "../../assets/4781669.png";
import trash from "../../assets/trash.svg";
import cross from "../../assets/cross.svg";
import Fake4 from "../../assets/Fake4.svg";
import Fake6 from "../../assets/Fake6.svg";
import leftarrow from "../../assets/leftarrow.svg";

import bigsurPlus from "../../assets/bigsurPlus.svg";
import { useDispatch, useSelector } from "react-redux";

import { bigsurButtton } from "../../redux/bigSureSlice";
import { pageNameButton } from "../../redux/PageNameSlice";
import { projectNameButton } from "../../redux/ProjectNameSlice";
import { myTaskDataAction } from "../../redux/myTaskSlice";

function Toolbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);
  const [totalProject, setTotalProject] = useState([
    { _id: 0, projectName: "" },
  ]);

  const handleBoxHover = (index) => {
    setActiveBoxIndex(index);
  };

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const boxWidth = boxRef.current.offsetWidth;
    const boxMargin = parseInt(getComputedStyle(boxRef.current).marginRight);
    const maxNumBoxes = Math.floor(containerWidth / (boxWidth + boxMargin));
    const adjustedContainerWidth = (boxWidth + boxMargin) * maxNumBoxes;
    containerRef.current.style.width = `${adjustedContainerWidth}px`;
  }, []);
  function handleDragStart(e, data) {
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  }
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
        setTotalProject(data.updatedUser.projects);
      }
    };
    fetchProject();
  }, []);

  function handleDrop(e) {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const fetchProject = async () => {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

      res = await fetch(`http://localhost:8000/delete/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: dragData,
          token: tokenObject.tokenGen,
        }),
      });

      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Yes Project Name Successfully Updated", data.status);
      }
    };
    fetchProject();
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div
      className={styled.outerContainer}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <div
        className={styled.toolbarContainer}
        ref={containerRef}
        style={{ minWidth: "8.7rem" }}
      >
        <div
          className={styled.allBoxContainer}
          style={{ maxWidth: "98%", paddingLeft: ".8rem" }}
        >
          {totalProject &&
            totalProject.map((box, ind) => (
              <div
                key={box._id}
                className={`${styled.toolbarBox} ${
                  activeBoxIndex === box._id ? styled.active : ""
                }`}
                draggable
                onDragStart={(e) => {
                  handleDragStart(e, box);
                }}
                onDrag={(e) => {}}
                ref={boxRef}
                onMouseEnter={() => handleBoxHover(box._id)}
                onMouseLeave={() => handleBoxHover(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "trasnparent",
                  // paddingTop: "1rem",
                }}
                onClick={() => {
                  const tokenObject = JSON.parse(
                    localStorage.getItem("userToken")
                  );
                  tokenObject.projectName = box.projectName;
                  localStorage.setItem(
                    "userToken",
                    JSON.stringify(tokenObject)
                  );
                  dispatch(projectNameButton(box.projectName));
                  dispatch(myTaskDataAction([]));
                  navigate(`/home/${box.projectName}/0/home/`);
                  dispatch(pageNameButton("Home"));
                }}
              >
                <div
                  className={`${styled.toolbarBoxIcon} ${
                    activeBoxIndex === box._id ? styled.active : ""
                  }`}
                  // style={{backgroundColor:"red"}}
                >
                  <img src={Fake6} alt="dfsdfsd" />
                </div>
                <div style={{ marginTop: ".7rem", fontSize: "1rem" }}>
                  {box.projectName}
                </div>
              </div>
            ))}
        </div>

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <div
              className={styled.bigsurAdd}
              onClick={() => {
                dispatch(bigsurButtton(true));
              }}
            >
              <img src={bigsurPlus} alt="bigsurPlus" />
            </div>
            <div
              style={{
                width: "100%",
                border: "1px solid #7f7575",
                margin: "2rem 0rem",
              }}
            ></div>
            <div
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => {
                handleDragOver(e);
                e.target.style.color = "#7f7575";
              }}
            >
              <img src={trash} alt="trash" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const bigsurButttonValue = useSelector((state) => state.bisurB);
  const [menuToggleButton, setMenuToggleButtton] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isToolbarHovering, setIsToolbarHovering] = useState(false);
  const [createNewProject, setCreateNewProject] = useState({
    project: "",
  });

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function handleMouseMove(event) {
    const screenWidth = window.innerWidth;
    const triggerDistance = 1;
    const isHoveringRightSide = event.clientX >= screenWidth - triggerDistance;
    setIsHovering(isHoveringRightSide);
  }

  function handleToolbarMouseEnter() {
    setIsToolbarHovering(true);
  }

  function handleToolbarMouseLeave() {
    setIsToolbarHovering(false);
  }
  const AddProject = async (userData) => {
    let res, data;
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    if (true) {
      if (tokenObject.tokenStatus === "manual") {
        res = await fetch(`http://localhost:8000/user/project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: userData,
            source: "manual",
            token: tokenObject.tokenGen,
          }),
        });
      }
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log(
          "Yes Project Name Successfully Updated22",
          data.updatedUser.projects
        );
        dispatch(bigsurButtton(false));
      }
    }
  };

  return (
    <>
      <div className={styled.section}>
        {menuToggleButton ? (
          <div className={styled.branch_layout_togg}>
            <Branch></Branch>
          </div>
        ) : (
          ""
        )}
        <div
          className={menuToggleButton ? styled.workspace : styled.workspaceTogg}
        >
          <Title></Title>
          {/* <div style={{ border:"1px solid green",flex:1 }}> */}
          <div style={{ flex: 1 }}>
            <Outlet></Outlet>
          </div>
        </div>
        {/* <div style={{ height: "100vh",border:"1px solid red",position:"absolute",right:0 }}> */}
        {isHovering || isToolbarHovering ? (
          <Toolbar
            onMouseEnter={handleToolbarMouseEnter}
            onMouseLeave={handleToolbarMouseLeave}
          />
        ) : null}
        {/* </div> */}
      </div>
      {bigsurButttonValue ? (
        <div className={styled.editable1_sub} style={{ zIndex: 101 }}>
          <div className={styled.editable1_sub1}>
            <div className={styled.projectContainer}>
              <div>Project Name</div>
              <div
                className={styled.crossStyle1}
                onClick={() => {
                  dispatch(bigsurButtton(false));
                }}
              >
                <img src={cross} alt="cross" className={styled.closeIcon} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddProject(createNewProject);
                // if(selectedTeamID!=""){
                // AddMemberFunc();
                // }
              }}
            >
              <input
                type="text"
                defaultValue={createNewProject.project}
                name="project"
                onChange={(e) => {
                  setCreateNewProject({
                    ...createNewProject,
                    [e.target.name]: e.target.value,
                  });
                }}
                className={styled.editinputStyle}
                placeholder="Project Name ..."
                style={{ resize: "none", padding: "1rem", height: "3rem" }}
                autoFocus
                autoComplete="off"
              />
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
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                    // onClick={copyToClipboard}
                  >
                    {/* <button type="button" className={styled.AddStyle} onClick={copyToClipboard}>
                    Copy Link
                  </button> */}
                    {/* <input type="button" className={styled.AddStyle} placeholder="Copy Link" onClick={copyToClipboard}/> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <button type="submit" className={styled.AddStyle}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className={menuToggleButton ? styled.hideButton : styled.hideButtonTogg}
        onClick={() => {
          setMenuToggleButtton(!menuToggleButton);
        }}
      >
        <img src={leftarrow} alt="leftarrow" />
      </div>
    </>
  );
}

export default Home;
