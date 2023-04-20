

import React, { useState } from "react";
import { Outlet } from "react-router";
import PageDomainTaskFilter from "../../PageDomainTaskFilter";
import PageNav from "../../PageNav";


function DomainTaskCont() {


  return (
    <div
      style={{ position: "relative",height:"100%" }}
    >
      {/* <PageNav></PageNav> */}
 <PageDomainTaskFilter/>


<div style={{height:"80%",height:"72vh", maxHeight:"72vh"}}>
<Outlet/>
 </div>
      
    
    </div>
  );
}

export default DomainTaskCont;




