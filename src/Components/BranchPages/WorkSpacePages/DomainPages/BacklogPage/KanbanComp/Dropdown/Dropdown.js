import React, { useEffect, useRef } from "react";

import styled from "./Dropdown.module.css";

function Dropdown(props) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(event.target) &&
      props.onClose
    )
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div
      ref={dropdownRef}
      // className={`dropdown custom-scroll ${props.class ? props.class : ""}`}
      className={styled.dropdown}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;