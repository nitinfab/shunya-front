import React, { useState } from "react";
import { Outlet } from "react-router";
import PageNav from "../../PageNav";
import PageTaskFilter from "../../PageTaskFilter";
import styled from "./mytaskstyle.module.css";

function MytaskCont() {


  return (
    <div
      style={{ position: "relative",height:"100%" }}
    >
    {/* <div style={{height:"10%",maxHeight:"auto",}}> */}
      <PageNav></PageNav>

    {/* <div style={{height:"10%",maxHeight:"auto",}}> */}
      <PageTaskFilter   />
    {/* </div> */}


<div style={{height:"80%",height:"72vh", maxHeight:"72vh"}}>
      <Outlet   />

 </div>
      
    
    </div>
  );
}

export default MytaskCont;
