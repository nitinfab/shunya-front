

import React, { useEffect, useState } from "react";

import Board from "../KanbanComp/Board/Board";

import styled from  "./MainKanbanSty.module.css";
import Editable from "../KanbanComp/Editabled/Editable";
import { useDispatch, useSelector } from "react-redux";
import { myTaskDataAction } from "../../../../../../redux/myTaskSlice";
import { workspaceDataAction } from "../../../../../../redux/workspaceDataSlice";
import { useParams } from "react-router";

function MainKanban() {
  const dispatch=useDispatch()
  const {projectname,tabid,workspace}=useParams()
  const pageName = window.location.pathname.split("/");
  const domainSwitch= useSelector((state) => state.domainTask)
  const pageNamestateValue= useSelector((state) => state.PageNameB)
  const myTaskStateValue = useSelector((state) => state.mytaskDataB);
  const workspaceDataValue = useSelector((state) => state.workspaceDataB);



  const [cardUpdateState,setCardUpdateState]=useState(false)

  // const [boards, setBoards] = useState(
  //   domainSwitch.domainId===""?[JSON.parse(localStorage.getItem("DomainDetail1"))]: JSON.parse(localStorage.getItem("DomainDetail1"))?.find(
  //     (ele) =>
  //       ele.title ==
  //       pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
  //   )?.cards.find((ele,ind)=>{
  //     if(ele.id==domainSwitch.domainId){
  //       return ele;
  //     }
  //    }).tasks || domainSwitch.value==undefined?JSON.parse(localStorage.getItem("DomainDetail1")) :[]
  // );

 const [boards, setBoards] = useState(
  pageNamestateValue==="myTask"? myTaskStateValue   : domainSwitch.domainId!=""?
  
  workspaceDataValue.find((ele,ind)=>{
    if(ele.title==pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1))
    return ele;
   })?.cards.find((ele,ind)=>{
     if(ele._id==domainSwitch.domainId){
       return ele;
     }
    }).tasks
  : workspaceDataValue
 );








  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      title: name
      .charAt(0)
      .toUpperCase() +
    name.slice(1).toLowerCase(),
      cards: [],
    });
   
    setBoards(tempBoards);
    dispatch(myTaskDataAction(tempBoards));
    updatedTaskTicketFunc({
      title: name
      .charAt(0)
      .toUpperCase() +
    name.slice(1).toLowerCase(),
      cards: [],
    },)
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

///    Add Cards

  const addCardHandler = (id, title,descip) => {
   let index;
     index = boards.findIndex((item) => item._id === id);
    if (index < 0) return;
    let tempBoards = [...boards];
    let taskName=tempBoards[index].title;
  
    let CardId = Date.now().toString() +
      Math.random().toString(36).substring(2).toLocaleString();
      ///// my Task
    if(pageNamestateValue==="myTask"){
      let newCard= {
        _id: CardId,
        name: title,
        desc: descip ? descip : "Description of the task comes here. A brief about",
        labels: [{
          name:"Feature",
          value:"#D9D9D9",
          status:"labeltick"
        }],
        date:new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        tasks: [{
          subtask:[],
          issues:[],
          files:[],
          review:[],
        }],
        start: "",
        end: "",
        tag:"tag",
        type: "task",
      assignMem:[], 

        project: "ProjecSample",
        priority: "Low",
        status: "To_do",
      }
      tempBoards[index] = Object.assign({}, tempBoards[index], {
        cards: [
          newCard,
          ...tempBoards[index]?.cards,
        ],
      });
      if(index !=0){
        tempBoards[0] =  Object.assign({}, tempBoards[0], {
          cards: [
            newCard,
            ...tempBoards[0].cards,
          ],
        })
      }
      setBoards(tempBoards);
      dispatch(myTaskDataAction(tempBoards));
      updatedTaskFunc(tempBoards,taskName)

    }


    //////////////////////////////////////////////////////////////////////     WorkSpace

    else{

      let newCard= {
        
        _id: CardId,
        name: title,
        desc: descip ? descip : "Description of the task comes here. A brief about",
        labels: [{
          name:"Feature",
          value:"#D9D9D9",
          status:"labeltick"
        }],
        date:new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        tasks: [
          {
            _id:Date.now().toString() +
            Math.random().toString(36).substring(2),
            title: "All",
            cards: [],
          },
          {
            _id:Date.now().toString() +
            Math.random().toString(36).substring(2),
            title: "Backlog",
            cards: [],
          },
          {
            _id:Date.now().toString() +
            Math.random().toString(36).substring(2),
            title: "Assigned",
            cards: [],
          },
          {
            _id:Date.now().toString() +
            Math.random().toString(36).substring(2),
            title: "Created",
            cards: [],
          },
          {
            _id:Date.now().toString() +
            Math.random().toString(36).substring(2),
            title: "Completed",
            cards: [],
          },
        ],
        start: "",
        end: "",
        tag:"tag",
        type: "task",
      assignMem:[], 

        project: "ProjecSample",
        priority: "Low",
        status: "To_do",
      }

      ////////////////   Reason  this :--
      tempBoards[index] = Object.assign({}, tempBoards[index], {
        cards: [
          newCard,
          ...tempBoards[index].cards,
        ],
      });
      console.log("dsadasda",Object.assign({}, tempBoards[index], {
        cards: [
          newCard,
          ...tempBoards[index].cards,
        ],
      }),"======>>>",tempBoards[index])
      if(index !=0){
        tempBoards[0] =  Object.assign({}, tempBoards[0], {
          cards: [
            newCard,
            ...tempBoards[0].cards,
          ],
        })
      }
      ////   Domain
      if(domainSwitch.value){
      setBoards(tempBoards);
      dispatch(workspaceDataAction(tempBoards));
      updatedDomainFunc(tempBoards,taskName)

      }

      ///// Domain Tasks
      else{
        let copyDomainTask = [...workspaceDataValue];
        let updateDomainTask = copyDomainTask.map((ticket, ind) => {
          if (ticket.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)) {
            return {
              ...ticket,
              cards: ticket.cards.map((targetDomain) => {
                if (targetDomain._id == domainSwitch.domainId) {
                  return {
                    ...targetDomain,
                    tasks: targetDomain.tasks.map((domainTaskEle,ind)=>{
                  
                      if(domainTaskEle.title==taskName){
                        console.log("domainTaskEle",domainTaskEle)
              return {...domainTaskEle,cards:[{
                _id:CardId,
                name: title,
                desc: descip ? descip : "Description of the task comes here. A brief about",
                  labels: [{
                    name:"Feature",
                    value:"#D9D9D9",
                    status:"labeltick"
                  }],
                date:new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
                tasks: [{
                  subtask:[],
                  issues:[],
                  files:[],
                  review:[],
                }],
                start: "",
                end: "",
                tag:"tag",
                type: "task",
                labels: [{
                  name:"Feature",
                  value:"#D9D9D9",
                  status:"labeltick"
                }],
                assignMem:[],
                project: "ProjecSample",
                priority: "Low",
                status: "To_do",
              },...domainTaskEle.cards]}
                      }
                      else
                     return domainTaskEle
                    })
                  };
                }
                return targetDomain; 
              })
            };
          }
          return ticket;
        });
      dispatch(workspaceDataAction(updateDomainTask));
      updatedDomainTaskFunc(taskName,updateDomainTask)
      setBoards(updateDomainTask);

      }
    }
    // updatedTaskFunc(tempBoards,tempBoards[index].title)
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex]?.cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex]?.cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (domainTaskID, cardId, cardDetail) => {
    // const index = boards.findIndex((item) => item.id === domainTaskID);
//  domainTaskID  => Targeted index Id 
if(pageNamestateValue==="myTask"){
  let taskName;
  const tempBoards = [...boards];
  let ticketName=tempBoards.find((board) => {
   if (board._id === domainTaskID)
   return board
  })
   const updatedBoards = tempBoards.map(board => {
     if (board._id === domainTaskID) {
      taskName=board.title;
       const updatedCards = board?.cards.map(card => {
         if (card._id === cardId) {
           return {
             ...card,
             name: cardDetail.name,
             desc: cardDetail.description,
             priority: cardDetail.priority
           };
         } else {
           return card;
         }
       });
   
       return {
         ...board,
         cards: updatedCards
       };
     } else {
       return board;
     }
   });
let updatedBoards1=   updatedBoards.map(board => {
     if (board.title === "All") {
       const updatedCards = board?.cards.map(card => {
         if (card._id === cardId) {
           return {
             ...card,
             name: cardDetail.name,
             desc: cardDetail.description,
             priority: cardDetail.priority
           };
         } else {
           return card;
         }
       });
   
       return {
         ...board,
         cards: updatedCards
       };
     } else {
       return board;
     }
   });

   setBoards(updatedBoards1);
   dispatch(myTaskDataAction(updatedBoards1));
   updatedTaskFunc(updatedBoards1,taskName)
}
else{
  let DomaiName;
  const tempBoards = [...boards];
  let ticketName=tempBoards.find((board) => {
   if (board._id === domainTaskID)
   return board
  })
   const updatedBoards = tempBoards.map(board => {
     if (board._id === domainTaskID) {
      DomaiName=board.title;
       const updatedCards = board?.cards.map(card => {
         if (card._id === cardId) {
           return {
             ...card,
             name: cardDetail.name,
             desc: cardDetail.description,
             priority: cardDetail.priority
           };
         } else {
           return card;
         }
       });
   
       return {
         ...board,
         cards: updatedCards
       };
     } else {
       return board;
     }
   });
let updatedBoards1=   updatedBoards.map(board => {
     if (board.title === "All") {
       const updatedCards = board?.cards.map(card => {
         if (card._id === cardId) {
           return {
             ...card,
             name: cardDetail.name,
             desc: cardDetail.description,
             priority: cardDetail.priority
           };
         } else {
           return card;
         }
       });
   
       return {
         ...board,
         cards: updatedCards
       };
     } else {
       return board;
     }
   });
   if(domainSwitch.value){
       setBoards(updatedBoards1);
   dispatch(workspaceDataAction(updatedBoards1));
   updatedDomainFunc(updatedBoards1,DomaiName)

    }
    else{

      let copyDomainTask = [...workspaceDataValue];
      let updateDomainTask = copyDomainTask.map((ticket, ind) => {
        if (ticket.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)) {
          return {
            ...ticket,
            cards: ticket.cards.map((targetDomain) => {
              if (targetDomain._id == domainSwitch.domainId) {
                return {
                  ...targetDomain,
                  tasks: updatedBoards1
                };
              }
              return targetDomain; 
            })
          };
        }
        return ticket;
      });
    
      setBoards(updatedBoards1);
    dispatch(workspaceDataAction(updateDomainTask));
    updatedDomainTaskFunc(DomaiName,updateDomainTask)
    }

}

    // updatedTaskFunc(updatedBoards1,ticketName.title)


//     tempBoards.find((ele,ind)=>{
//       if(ele._id==domainTaskID)
//       {
//  console.log("Elelle1",ele)
// return ele;
//       }

//     }).cards.map((ele,ind)=>{
//         if(ele._id ==cardId)
//     {
//  console.log("Elelle2",ele)

//       ele.name=cardDetail.name;
//       ele.desc=cardDetail.description;

//       return ele;
//     }
//     else{
//       return ele;
//     }
//     })
//     tempBoards.find((ele,ind)=>{
//       if(ind==0)
//       {
//  console.log("Elelle1",ele)
// return ele;
//       }

//     }).cards.map((ele,ind)=>{
//         if(ele._id ==cardId)
//     {
//  console.log("Elelle2",ele)

//       ele.name=cardDetail.name;
//       ele.desc=cardDetail.description;

//       return ele;
//     }
//     else{
//       return ele;
//     }
//     })
  
//     setBoards(tempBoards);

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////








  //  var data= JSON.parse(localStorage.getItem("DomainDetail1"));



  //  var updateData=data.cards.find((ele) => ele.id == domainSwitch.domainId)?.tasks?.find((ele) => ele.id ==domainTaskID)?.cards.map((ele) => {
  //   if(ele.id ==cardId)
  //   {
  //     ele.name=cardDetail.name;
  //     ele.desc=cardDetail.description;

  //     return ele;
  //   }
  //   else{
  //     return ele;
  //   }
  //  })











  //  data.cards=updateData;

  //  setBoards(data);
//   if(cardDetail.cardStatus)
//  {
//    localStorage.setItem("DomainDetail1", JSON.stringify(data))

//   setCardUpdateState(!cardUpdateState)

//   console.log("hhuuiyuyiyuuyUYTYTRYERDDFFGGHGHGHJGGGJ")
//  }
  //  localStorage.setItem("DomainDetail1", JSON.stringify(data))
  
    // setBoards(data);



    // const index = boards.findIndex((item) => item.id === bid);
    // if (index < 0) return;

    // const tempBoards = [...boards];
    // const cards = tempBoards[index].cards;

    // const cardIndex = cards.findIndex((item) => item.id === cid);
    // if (cardIndex < 0) return;

    // tempBoards[index].cards[cardIndex] = card;

    // setBoards(tempBoards);
  };

  useEffect(() => {
    if(boards.length<1)
    {
     
        setBoards([...boards,{
          id: Date.now().toString() +
          Math.random().toString(36).substring(2).toLocaleString(),
          title: "All",
          cards: [],
        },
        {
          id: Date.now().toString() +
          Math.random().toString(36).substring(2).toLocaleString(),
          title: "Backlog",
          cards: [],
        },
        {
          id: Date.now().toString() +
          Math.random().toString(36).substring(2).toLocaleString(),
          title: "Assigned",
          cards: [],
        },
        {
          id: Date.now().toString() +
          Math.random().toString(36).substring(2).toLocaleString(),
          title: "Created",
          cards: [],
        },
        {
          id: Date.now().toString() +
          Math.random().toString(36).substring(2).toLocaleString(),
          title: "Completed",
          cards: [],
        },
      ])

  let data=JSON.parse(localStorage.getItem("DomainDetail1"))
     let updateData= data?.find(
      (ele) =>
      ele.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
    )?.cards.map((ele,ind)=>{
      if(ele._id==domainSwitch.domainId){
        ele.tasks=[...boards];
        return ele;
      }
      else{
        return ele;
      }
     })
data.cards=updateData;
      localStorage.setItem("DomainDetail1", JSON.stringify(data))
    }
    else{
      if(domainSwitch.value==true){
      localStorage.setItem("DomainDetail1", JSON.stringify([...boards]))
      }
      else{
      let data=JSON.parse(localStorage.getItem("DomainDetail1"))
      let updateData= data?.find(
        (ele) =>
        ele.title == pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1)
      )?.cards.map((ele,ind)=>{
       if(ele._id==domainSwitch.domainId){
         ele.tasks=[...boards];
         return ele;
       }
       else{
         return ele;
       }
      })
 data.cards=updateData;
 
      localStorage.setItem("DomainDetail1", JSON.stringify(data))
      // localStorage.setItem("kanbanBoard", JSON.stringify(boards))
      }
    }
  }, [boards,cardUpdateState]);



  // function updatedTaskFunc(updatedData,ticket) {
  
  //   async function myTaskFunc(ticket, updatedData) {
  //     let res, data;
  //     const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  //     if(pageNamestateValue==="myTask"){
  //       res = await fetch(`http://localhost:8000/update`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           source: "manual",
  //           tokenData: {
  //             token: tokenObject.tokenGen,
  //             project: tokenObject.projectName,
  //             kanbanData: {
  //               data: updatedData.find((ele, ind) => {
  //                 if (ele.title == ticket) return ele;
  //               }),
  //               data1: updatedData.find((ele, ind) => {
  //                 if (ele.title == "All") return ele;
  //               }),
  //               ticketName: ticket,
  //             },
  //           },
  //         }),
  //       });

  //     }
  //     else{


  //       res = await fetch(`http://localhost:8000/user/domain/update`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           source: "manual",
  //           tokenData: {
  //             token: tokenObject.tokenGen,
  //             project: tokenObject.projectName,
  //             kanbanData: {
  //               data: updatedData.find((ele, ind) => {
  //                 if (ele.title == ticket) return ele;
  //               }),
  //               data1: updatedData.find((ele, ind) => {
  //                 if (ele.title == "All") return ele;
  //               }),
  //               ticketName: ticket,
  //             },
  //             workspaceName:workspace

  //           },
  //         }),
  //       });

  //     }
    
  //     data = await res.json();

  //     if (data.status == 422) console.log("Error to insert in MyTask");
  //     else {

  //       console.log("jhsdjh76666622",data)
  //     }
  //   }
  //   myTaskFunc(ticket, updatedData);
  // }


////////////////////////////////////////////////   MyTask    ////////////////////////////////////////////////////
  ///////   ==>>> Task Section Update
  function updatedTaskFunc(updatedData,taskName) {
 


    async function myTaskFunc(updatedData,taskName) {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

      res = await fetch(`http://localhost:8000/user/myTask/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "manual",
          tokenData: {
            token: tokenObject.tokenGen,
            project: tokenObject.projectName,
            kanbanData: {
              data: updatedData.find((ele, ind) => {
                if (ele.title == taskName) return ele;
              }),
              data1: updatedData.find((ele, ind) => {
                if (ele.title == "All") return ele;
              }),
              ticketName: taskName,
            },
            migrationState:{
              state:false,
              value:""
            }
          },
        }),
      });
      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
      }
    }
    myTaskFunc( updatedData,taskName);
  }
  //////////// ==>>> Add New Ticket

  async function updatedTaskTicketFunc(taskTicketName) {
    const tokenObject = JSON.parse(localStorage.getItem("userToken"));

    let res = await fetch(
       `http://localhost:8000/user/mytask/add/ticket`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           tokenData: {
             token: tokenObject.tokenGen,
             project: pageName[2],
           },
           ticketName: taskTicketName
         }),
       }
     );
   let  data = await res.json();
    if(data.status!=422){
    }
   }
////////////////////////////////////////////////   MyTask    ////////////////////////////////////////////////////

  ////////  Domain Section Update:----

  function updatedDomainFunc(updatedData,DomaiName) {
    
 

    async function myTaskFunc( updatedData,DomaiName) {
      let res, data;
      const tokenObject = JSON.parse(localStorage.getItem("userToken"));

      res = await fetch(`http://localhost:8000/user/domain/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "manual",
          tokenData: {
            token: tokenObject.tokenGen,
            project: tokenObject.projectName,
            kanbanData: {
              data: updatedData.find((ele, ind) => {
                if (ele.title == DomaiName) return ele;
              }),
              data1: updatedData.find((ele, ind) => {
                if (ele.title == "All") return ele;
              }),
              ticketName: DomaiName,
            },
            workspaceName:workspace,
            migrationState:{
              state:false,
              value:""
            }

          },
        }),
      });
      data = await res.json();

      if (data.status == 422) console.log("Error to insert in MyTask");
      else {
      }
    }
    myTaskFunc( updatedData,DomaiName);
  }

      /////////////////////////////   Update Domain Task function.....

    function updatedDomainTaskFunc(DomaintaskTickName,updateDomainTask) {
    
      let targetDomainTitle =
        pageName[6].charAt(0).toUpperCase() + pageName[6].slice(1);
      async function myTaskFunc(DomaintaskTickName, updateDomainTask) {
        let res, data;
        const tokenObject = JSON.parse(localStorage.getItem("userToken"));
  
        res = await fetch(`http://localhost:8000/user/workspace/task/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "manual",
            tokenData: {
              token: tokenObject.tokenGen,
              project: tokenObject.projectName,
              kanbanData: {
                data: updateDomainTask.find((ele, ind) => {
                  if (ele.title == targetDomainTitle) return ele;
                }).cards.find((ele,ind)=>{
                  if(ele._id === domainSwitch.domainId)
                  return ele
                }).tasks.find((ele,ind)=>{
                  if(ele.title==DomaintaskTickName)
                  return ele
                }),
                data1: updateDomainTask.find((ele, ind) => {
                  if (ele.title == targetDomainTitle) return ele;
                }).cards.find((ele,ind)=>{
                  if(ele._id === domainSwitch.domainId)
                  return ele
                }).tasks.find((ele,ind)=>{
                  if(ele.title=="All")
                  return ele
                }),
                ticketName1: targetDomainTitle,
                ticketName2:DomaintaskTickName,
                domainName:domainSwitch.domainId,
              },
              workspaceName:workspace,
              migrationState:{
                state:false,
                value:""
              }
  
            },
          }),
        });
        data = await res.json();
  
        if (data.status == 422) console.log("Error to insert in MyTask");
        else {
          console.log("Hudystydt33",data.updatedData)
        }
      }

      myTaskFunc(DomaintaskTickName, updateDomainTask);


    }
  return (
    <div className={styled.kanbanMain}>
    
      <div className={styled.kanbanMain_boards_container}>
        <div className={styled.kanbanMain_boards}>
          {
          boards.map((item) => {
            return  <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          })
          }
          <div className={styled.kanbanMain_boards_last} >
            <Editable
              displayClass="kanbanMain_boards_add-board"
              editClass="kanbanMain_boards_add-board_edit"
              placeholder="Enter Board Name"
              boardStatus="true"
              text="Add Board"
              buttonText="Add Board"
              onSubmit1={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainKanban;

