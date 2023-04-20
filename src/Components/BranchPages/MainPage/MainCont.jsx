import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { currentProjectUpdate } from "../../../redux/currentProjectSlice";
function MainCont() {

  return (
    <div style={{ height: "100%",width:"100%" }}>
      <Outlet></Outlet>
    </div>
  );
}

export default MainCont;
