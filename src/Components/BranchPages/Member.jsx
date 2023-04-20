import React from "react";
import styled from "./WorkSpacePages/workStyle.module.css";

import rect from "../../assets/Rectangle.svg";
import dash from "../../assets/dashboard.svg";
import doc from "../../assets/doc.svg";

function Member() {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          fontSize: "1.6rem",
        }}
      >
        {/* /////// Section 1 */}
        <div style={{ width: "68%", height: "100%", color: "#fff" }}>
          <div>
            <div style={{ margin: "2rem 0rem" }}>Project Overview</div>
            <p>
              Hi there. Complete these issues to learn how to use Linear andc
              discover ✨ProTips. When you're done, delete them or move them to
              another team for others to view. To start, type C to create your
              first issue. Create issues from any view using C or by clicking
              the New issue button.
            </p>
          </div>
          <div style={{ margin: "2rem 0rem" }}>
            <div style={{ marginBottom: "2rem" }}>Files & Links</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styled.docContainer}>
                <div>
                  <img src={doc} alt="documnet" />
                </div>
                <div>
                  <div>Photos</div>
                  <div>doc.google.com</div>
                </div>
              </div>
              <div className={styled.fileButton}>+</div>
            </div>
          </div>
        </div>

        {/* //////// Section 2 */}
        <div
          style={{
            width: "32%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <div style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
            <img src={dash} alt="dashboard" />
          </div>
        </div>
      </div>
      {/* {
    true?
    <div className={styled.memberCard}>
        <div style={{display:"flex",justifyContent:"space-between",height:"4rem",padding:"1rem 2rem",fontSize:"1.4rem"}}>
        <div>Members</div>
            <div>X</div>
        </div>
        <div className={styled.memberCardSub}>
        <div style={{marginTop:"2rem",padding:"0rem 2rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2rem"}}>
                <div style={{marginLeft:"5rem"}}>
                    <div style={{display:"flex"}}>
                        <div style={{marginRight:"1rem",marginBottom:".2rem"}}>Ritik Sharma</div>
                        <div>C</div>
                    </div>
                    <div>Marketing</div>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".2rem"}}>
                     <div></div>
                     <div>...</div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div style={{marginRight:"1rem",color:"red",fontSize:"1rem"}}>.</div>
                        <div>Online</div>
                    </div>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2rem"}}>
            <div style={{marginLeft:"5rem"}}>
                    <div style={{display:"flex"}}>
                        <div style={{marginRight:"1rem",marginBottom:".2rem"}}>Ritik Sharma</div>
                        <div>C</div>
                    </div>
                    <div>Marketing</div>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".2rem"}}>
                     <div></div>
                     <div>...</div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div style={{marginRight:"1rem",color:"red",fontSize:"1rem"}}>.</div>
                        <div>Online</div>
                    </div>
                </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2rem"}}>
            <div style={{marginLeft:"5rem"}}>
                    <div style={{display:"flex"}}>
                        <div style={{marginRight:"1rem",marginBottom:".2rem"}}>Ritik Sharma</div>
                        <div>C</div>
                    </div>
                    <div>Marketing</div>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".2rem"}}>
                     <div></div>
                     <div>...</div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div style={{marginRight:"1rem",color:"red",fontSize:"1rem"}}>.</div>
                        <div>Online</div>
                    </div>
                </div>
            </div>
            
        </div>

        </div>
    </div>:""
} */}
    </>
  );
}

export default Member;
