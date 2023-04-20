import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import threeDot from "../../../../../../../assets/threeDot.svg";
import cross from "../../../../../../../assets/cross.svg";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import styled from  "./Board.module.css";

function Board(props) {


  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={`${styled.board}`}   
    style={props.board?.cards?.length==0 ? { backgroundColor: "#1b1b1f" } : {}}
  >
       <div className={styled.board_header} >
        <div style={{ display: "flex", alignItems: "center", }}>
          <div
            style={{
              marginRight: ".8rem",
              border: "1px dashed #E7E6E6",
              width: "1rem",
              height: "1rem",
              borderRadius: "1rem",
            }}
          ></div>
          <p className={styled.board_header_title}>
            {props.board?.title}
            <span style={{ marginLeft: "1rem", color: "#413E3E" }}>
              {props.board?.cards?.length || 0}
            </span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "1.5rem" }}>
            <img src={cross} alt="threeDot" />
          </div>
          <div
            className={styled.board_header_title_more}
            onClick={() => setShowDropdown(true)}
          >
            <div>
              <img src={threeDot} alt="threeDot" />
            </div>
            {/* {showDropdown && (
            <Dropdown
              className={styled.board_dropdown}
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )} */}
          </div>
        </div>
      </div>
      <div className={`${styled.board_cards}`}  
      
      // style={{backgroundColor:"rgba(10, 10, 10, 0.1)"}}
      >
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board._id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        {props.board?.cards?.length==0?
        <div style={{marginTop:"1rem"}}>
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add_card"
          boardStatus="false"
          editClass="board_add_card_edit"
          onSubmit={(value,descrip) => props.addCard(props.board?._id, value,descrip)}
        />

        </div>:
        <Editable
          text="+ Add Card"
          placeholder="Enter Card Title"
          displayClass="board_add_card"
          boardStatus="false"
          editClass="board_add_card_edit"
          onSubmit={(value,descrip) => props.addCard(props.board?._id, value,descrip)}
        />
        }
      </div>
    </div>
  );
}

export default Board;