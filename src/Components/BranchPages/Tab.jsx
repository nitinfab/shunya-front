import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Plus_icon from "../../assets/Plus_icon.svg";
import cross from "../../assets/cross.svg";
import Fake5 from "../../assets/Fake5.svg";
import tabCrossW from "../../assets/tabCrossW.svg";
import tabCross from "../../assets/tabCross.svg";
import styled from "./extra.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setprevSliceValue, setcurrSliceValue } from "../../redux/prevSlice";
import {
  addTitle,
  deleteTitle,
  updateTitle,
  confirmPageTitle,
} from "../../redux/TabSlice";
import { domainPageUpdate } from "../../redux/domainPageSlice";
function Tab() {
  const navigate = useNavigate();
  const { projectname, tabid } = useParams();

  let dispatch = useDispatch();
  const pageName = window.location.pathname.split("/");
  const [currentState, setCurrentState] = useState("");
  const [prevState, setPrevState] = useState("0");
  let [count, setCount] = useState(-1);
  // const [tabChange, setTabChange] = useState(false);
  const [targetedId, settargetedId] = useState("0");
  let branchPageValue = useSelector((state) => state.branchPage);
  let titleBarValue = useSelector((state) => state.tab);
  let prevStateValue = useSelector((state) => state.tabPrevState);

  function handleDrop(e) {
    e.preventDefault();

    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (dragData.projectName) {
      dispatch(
        addTitle({
          name: dragData.projectName,
          currentTab: "",
          url: `/home/${dragData.projectName}/${titleBarValue.length}/home`,
        })
      );
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }

  useEffect(() => {
    dispatch(
      confirmPageTitle({
        value: tabid,
        name: projectname,
        url: window.location.pathname,
      })
    );
  }, [window.location.pathname]);
  console.log("IUYygwe432",titleBarValue)
  return (
    <>
      <div className={styled.tab_main_container}>
        {titleBarValue.map((ele, ind) => {
          return (
            <div
            key={ind}
              style={{
                display: "flex",
                justifyContent: "center",
                minWidth: "19rem",
                height: "2.9rem",
                position: "relative",
                marginRight: "2rem",
                // border: "1px solid yellow"
              }}
            >
              <div
                className={styled.shapeContainer}
                style={{
                  background:
                    ele.id == tabid
                      ? "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)"
                      : "transparent",
                // border: "1px solid red"

                }}
                onClick={() => {
                  console.log("Parent");
                  navigate(ele.url);
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ margin: "0rem .8rem" }}>
                    <img src={Fake5} alt="sdsdsd" />
                  </div>
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "1.2rem",
                      color: ele.id == tabid ? "#fff" : "",
                    }}
                  >
                    {ele.name}
                  </div>
                </div>
                <div
                  style={{
                    marginRight: "1.5rem",
                    fontSize: "1.2rem",
                    marginTop: ".5rem",
                    zIndex: 10,
                    color: ele.id == tabid ? "#fff" : "#7f7575",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (ele.id != 0) {
                      dispatch(deleteTitle({ value1: ele.id }));
                      navigate(
                        `/home/${titleBarValue[ele.id - 1].name}/${[
                          ele.id - 1,
                        ]}/home`
                      );
                    }
                  }}
                >
                  <img
                    src={ele.id == tabid ? tabCrossW : tabCross}
                    alt="cross"
                  />
                </div>
              </div>
              <div
                className={styled.shapeContainer1}
                style={{
                  background:
                    ele.id == tabid
                      ? "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)"
                      : "transparent",
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div
        className={styled.addTitleButton}
        onClick={() => {
          dispatch(
            addTitle({
              name: projectname,
              currentTab: `${titleBarValue.length}`,
              url: `/home/${projectname}/${titleBarValue.length}/home`,
            })
          );
        }}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => {
          handleDragOver(e);
          e.target.style.color = "#7f7575";
        }}
        onDragStart={(e) => {
          e.target.style.color = "#fff";
        }}
      >
        <img src={Plus_icon} alt="add" />
      </div>
    </>
  );
}

export default Tab;

{
  /* <div className={styled.tab_main_container}>
{titleBarValue.map((ele, ind) => {

return   <div style={{display:"flex", justifyContent:"center" ,width:"27rem",height:"2.9rem",position:"relative",marginRight:"4rem"}}>
<div className={styled.shapeContainer}></div>
<div className={styled.shapeContainer1}></div>
{ele.name}
</div>
})}

</div> */
}

/*

  <div className={styled.tab_main_container}>
        {titleBarValue.map((ele, ind) => {
          return (
            <div
              key={ind}
              className={
                ind == prevStateValue.currentValue
                  ? `${styled.tab_container_spec}`
                  : `${styled.tab_container}`
              }
              id={ind}
              onClick={() => {
                // settargetedId(String(ind));
                dispatch(
                  setcurrSliceValue({
                    currentValue: String(ind),
                  })
                );
                TargetedTabFun(ind);
              }}
              style={{ borderLeft: ind == 0 ? "" : "2px solid #413e3e" }}
            >
              <div style={{ position: "relative" }}>
                <div
                  className={
                    ind == prevStateValue.currentValue
                      ? `${styled.tabSearch_togg}`
                      : `${styled.tabSearch}`
                  }
                >
                  <input
                    type="text"
                    key={ind}
                    defaultValue={
                      ele.name
                        ? ele.name.charAt(0).toUpperCase() + ele.name.slice(1)
                        : ""
                    }
                    id={ind}
                    className={
                      ind == prevStateValue.currentValue
                        ? `${styled.tabSearch_toggInput}`
                        : `${styled.tabSearchInput}`
                    }
                    autoComplete="off"
                  ></input>
                </div>
                <div
                  id={ind}
                  style={{
                    position: "absolute",
                    top: "35%",
                    right: "5%",
                  }}
                  onClick={(e) => {
                    if (titleBarValue.length > 1) {
                      dispatch(deleteTitle({ value1: e.currentTarget.id }));
                    }
                  }}
                >
                  <img
                    src={cross}
                    alt="cancel"
                    style={{ width: "1rem", height: "1rem" }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

*/
