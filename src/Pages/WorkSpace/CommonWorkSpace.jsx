import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "../user.module.css";
import { confirmPageTitle } from "../../redux/TabSlice";
import { currentProjectUpdate } from "../../redux/currentProjectSlice";
import blob8Icon from "../../assets/blob8.svg";
import blob9Icon from "../../assets/blob9.svg";
import blob10Icon from "../../assets/blob10.svg";
import { myTaskDataAction } from "../../redux/myTaskSlice";

function CommonWorkSpace() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userProject, setUserProject] = useState({
    workspaceName: "",
  });

  const AddWorkspace = async (userData) => {
    let res, data;
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    if (true) {
      if (tokenObject.tokenStatus === "manual") {
        res = await fetch(`http://localhost:8000/user/workspace`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: userData,
            source: "manual",
            tokenData: {
              token: tokenObject.tokenGen,
              project: tokenObject.projectName,
            },
          }),
        });
      }
      data = await res.json();
      if (data.status === 422) {
        console.log("Project Name Not Updated", data);
      } else {
        console.log("Yes Project Name Successfully Updated22");
        let userObb = {
          tokenGen: data.updatedUser.token,
          tokenStatus: "manual",
          projectName: data.updatedUser.projects[0].projectName,
          userName: data.updatedUser.name,
        };
        localStorage.setItem("userToken", JSON.stringify(userObb));
        dispatch(
          confirmPageTitle({
            value: 0,
            name: data.updatedUser.projects[0].projectName,
            url: `/home/${data.updatedUser.projects[0].projectName}/0/home`,
          })
        );
        navigate(`/home/${data.updatedUser.projects[0].projectName}/0/home`);
      }
    }
  };

  return (
    <>
      <div className={styled.signcontainer}>
        <div
          className={styled.section1}
          style={{ zIndex: 2, marginTop: "10rem" }}
        >
          <div className={styled.proHeading}>
            What’s something you and your team are currently working on ?
          </div>
        </div>
        <div className={styled.prosection2} style={{ zIndex: 2 }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              AddWorkspace(userProject.workspaceName);
            }}
          >
            <div className={styled.projectContainer} style={{ zIndex: 2 }}>
              <div className={styled.projectSubContainer}>
                <div className={styled.inputBox}>
                  <input
                    type="text"
                    id="workspaceName"
                    placeholder="eg... Workspace"
                    name="workspaceName"
                    defaultValue={userProject.workspaceName}
                    onChange={(e) => {
                      setUserProject({
                        ...userProject,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    autoComplete="off"
                    className={styled.projectInputStyle}
                  ></input>
                </div>
                <button
                  className={styled.inputBox}
                  style={{
                    marginTop: "3rem",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "1.8rem",
                    fontWeight: "40rem",
                    cursor: "pointer",
                    minHeight: "5rem",
                  }}
                >
                  create new WorkSpace
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={styled.bolb8}>
          <img src={blob8Icon} alt="fsjfskd" />
        </div>
        {/* <div className={styled.bolb9}>
          <img src={blob9Icon} alt="fsjfskd" />
        </div> */}
        {/* <div className={styled.bolb10}>
          <img src={blob10Icon} alt="fsjfskd" />
        </div> */}
        {/* <div className={styled.bolb5}>
          <svg
            width="315"
            height="345"
            viewBox="0 0 315 345"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M198.938 1.3178C229.786 7.03563 257.259 26.802 277.964 52.1199C298.382 77.0873 310.188 108.904 313.945 141.949C317.577 173.893 311.661 206.092 298.771 235.117C286.31 263.173 265.34 284.606 242.286 303.302C218.413 322.662 193.241 343.195 163.414 344.885C133.368 346.588 106.116 329.041 80.2402 312.485C54.2992 295.887 27.8273 277.97 13.8107 249.164C-0.349109 220.063 -2.82656 185.604 2.78424 153.301C8.15818 122.362 25.0497 95.9256 44.5029 72.4611C63.2294 49.8731 86.3132 33.2865 112.149 21.3848C139.921 8.59128 169.176 -4.19888 198.938 1.3178Z"
              fill="#FF2C62"
            />
          </svg>
        </div> */}
      </div>
    </>
  );
}

export default CommonWorkSpace;
