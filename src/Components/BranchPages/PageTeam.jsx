import React, { useEffect, useState } from "react";
import styled from "./extra.module.css";
import counter from "../../assets/Group2.png";
import share from "../../assets/share.svg";
import user from "../../assets/user.svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

function PageTeam() {
  const pageName = window.location.pathname.split("/");
  const location = useLocation();
  const teamDetails = useSelector((state) => state.allTeamPageDetail);

  function getTeamAdd() {
    // if(pageName[3]==="teamAdd")
    if (false) return true;
    else {
      return false;
    }
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <div
          style={{
            height: "12rem",
            padding: "2rem 0rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={styled.newTeamIcon}></div>
            <div>
              <div style={{ marginLeft: "1rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1.3rem" }}>
                  {location.state.id.teamName ? location.state.id.teamName : ""}
                </div>
                <div style={{ display: "flex", fontSize: "1rem" }}>
                  <div style={{ display: "flex", marginRight: "1.5rem" }}>
                    <div style={{ marginRight: "1rem" }}>
                      <img
                        src={counter}
                        alt="counter"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                    <div>22 Feb,2023</div>
                  </div>
                  <div style={{ display: "flex", marginRight: "1.5rem" }}>
                    <div style={{ marginRight: "1rem" }}>
                      <img
                        src={share}
                        alt="counter"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                    <div>invite members</div>
                  </div>
                  <div style={{ display: "flex", marginRight: "1.5rem" }}>
                    <div style={{ marginRight: "1rem" }}>
                      <img
                        src={counter}
                        alt="counter"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                    </div>
                    <div>Samiya.endu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styled.editProfile}>
              <img src={user} alt="user" />
              Edit Profile
            </div>
          </div>
        </div>
        <div className={styled.branch_line1}>
          <div style={{ border: ".25px solid #413E3E" }}></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default PageTeam;
