import React, { useState } from "react";
import styled from "./Branch.module.css";
import BranchMenu from "./BranchMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import workspace1 from "../../assets/workspace.svg";
import workspace1W from "../../assets/workspace1W.svg";
import logo from "../../assets/logo.svg";
import ADD from "../../assets/ADD.svg";

const Branch = () => {
  const {projectname,tabid}=useParams()
  const searchContainerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [showTab, setShowTab] = useState(false);
  const pageName = window.location.pathname.split("/");
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowTab(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  const [pagesValue, setPagesValue] = useState([
    "Home",
    "Workspace",
    "My Tasks",
    "Reports",
    "Calender",
    "Spaces",
  ]);
  return (
    <div className={styled.branch}>
      {/* <div ref={searchContainerRef} className={styled.search_container}> */}
      <div  className={styled.search_container} style={{display:"flex"}}>
      <div><img src={logo} alt="logo" /></div>
      <div style={{marginLeft:"1.4rem",fontSize:"1.7rem",fontWeight:"bold",color:"#fff"}}>Shunya</div>
        {/* <div className={styled.inputBox}>
          <div
            style={{ marginLeft: "1rem", marginRight: "1rem" }}
            className={styled.FilterIcon}
          >
            <i
              style={{ fontSize: "1.4rem" }}
              className="fa-solid fa-magnifying-glass"
            ></i>
          </div>

          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => {
              setShowTab(true);
              setSearch(e.target.value);
            }}
          />
        </div> */}
        

        {/* //////////////////////    Search Section   ////////////////// */}

        {showTab ? (
          <div className={styled.tabSearchSection}>
            {pagesValue
              .filter((page) => {
                return page.toLowerCase().includes(search.toLowerCase());
              })
              .map((ele, ind) => {
                return (
                  <div
                  key={ind}
                    onClick={() => {
                      setShowTab(false);
                      setSearch("");
                    }}
                  >
                    {ele}
                  </div>
                );
              })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styled.branch_line}>
        <div style={{ border: ".25px solid #413E3E" }}></div>
      </div>
      {/* /////////////     BranchMenu      ////////////////////// */}

      <div className={styled.branch_section}>
        <div>
          <BranchMenu></BranchMenu>
        </div>
      
      </div>
    </div>
  );
};

export default Branch;
