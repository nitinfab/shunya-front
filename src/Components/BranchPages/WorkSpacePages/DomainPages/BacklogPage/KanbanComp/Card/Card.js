import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";

import Dropdown from "../Dropdown/Dropdown";
import Urgent from "../../../../../../../assets/urgentPrio.svg";
import Mid from "../../../../../../../assets/midPrio.svg";
import Low from "../../../../../../../assets/lowPrio.svg";
import High from "../../../../../../../assets/highPrio.svg";
import pin from "../../../../../../../assets/pin.svg";
import bell from "../../../../../../../assets/bell.svg";
import styled from "./Card.module.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, name, date, tasks, labels, desc,priority } = props.card;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Aprl",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };
  const getImageForOption1 = (option) => {
    switch (option) {
      case "Low":
        return Low;
      case "Mid":
        return Mid;
      case "High":
        return High;
      case "Urgent":
        return Urgent;
      default:
        return Low;
    }
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}
      <div
        className={styled.card}
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)} // open detail and update card
      >
        {/* <div className={styled.card_top}>
          <div className={styled.card_top_labels}>
            {labels?.map((item, index) => (
              <label key={index} style={{ backgroundColor: item.color }}>
                {item.text}
              </label>
            ))}
          </div>
          <div
            className={styled.card_top_more}
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
          <span>shfkhsdfu</span>
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div> */}
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "1.6rem" }}
        >
          <div className={styled.card_title}>{name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <img
                src={pin}
                alt="network"
                style={{ height: "2rem", width: "2rem" }}
              />
            </div>
            <div>
              <img
                src={bell}
                alt="network"
                style={{ height: "2rem", width: "2rem", margin: "0rem 1.5rem" }}
              />
            </div>

            <div
              style={{
                width: "2rem",
                height: "2rem",
                border: "1px solid #7f7575",
                borderRadius: "1rem",
              }}
            ></div>
          </div>
        </div>
        <div style={{ fontSize: "1.2rem", margin: "1.5rem 0rem",minHeight:"3.6rem", }}>{desc}</div>
        <div
          style={{
            display: "flex",
            height:"2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
            <img
                                  src={getImageForOption1(priority)}
                                  alt=""
                                />
            </div>
            <div style={{ margin: "0rem 1rem" }} className={styled.semiCircle2}>
              <span>Issues</span>
              <span>2</span>
            </div>
            <div>
              {" "}
              <div className={styled.semiCircle3}>
                <span
                  style={{
                    color: "#fff",
                    fontSize: "2.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  .
                </span>
                <span>Feature</span>
              </div>
            </div>
            <div
              style={{ margin: "0rem 1.5rem" }}
              className={styled.semiCircle1}
            >
              <span
                style={{
                  width: ".8rem",
                  height: ".8rem",
                  borderRadius: ".5rem",
                  border: ".3px solid ",
                }}
              ></span>
              <span>2</span>
            </div>
          </div>
          <div  className={styled.semiCircle1}>
            <span
              style={{
                width: ".8rem",
                height: ".8rem",
                borderRadius: ".5rem",
                border: ".3px solid ",
              }}
            ></span>
            <span>3</span>
          </div>
        </div>
        {/* <div className={styled.card_footer}>
          {date && (
            <p className={styled.card_footer_item}>
              <Clock className={styled.card_footer_icon} />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className={styled.card_footer_item}>
              <CheckSquare className={styled.card_footer_icon} />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div> */}
      </div>
    </>
  );
}

export default Card;
