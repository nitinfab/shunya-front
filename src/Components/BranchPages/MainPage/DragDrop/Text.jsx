import React, { forwardRef } from "react";
import styled from "../mainstyle.module.css";
import threeDot from "../../../../assets/threeDot.svg";
import cross from "../../../../assets/cross.svg";

export const Text = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      width: "520px",
      height: "308px",

      background:
        "linear-gradient(139.9deg, #2C2D3C -1.55%, rgba(25, 26, 35, 0.1) 100%)",
      border: "0.5px solid #7F7575",
      backdropFilter: "blur(10px)",

      borderRadius: "4px",
      //   ...style
    };
    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <div
          style={{
            height: "4rem",
            padding: "1rem",
            fontSize: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "1.3rem" }}>{url.text}</div>
          <div
            style={{ display: "flex", fontSize: "2rem", alignItems: "center" }}
          >
            <div
              style={{
                marginRight: "1rem",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div>
                <img src={threeDot} alt="cross" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img src={cross} alt="cross" />
              </div>
            </div>
          </div>
        </div>
        <div className={styled.dragCard}></div>
      </div>
    );
  }
);
