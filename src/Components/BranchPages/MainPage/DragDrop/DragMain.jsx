// import React, { useRef, useState } from "react";
// import {
//   DndContext,
//   closestCorners,
//   MouseSensor,
//   TouchSensor,
//   DragOverlay,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { arrayMove, SortableContext } from "@dnd-kit/sortable";
// import { SortableText } from "./SortableText";
// import { Text } from "./Text";

// const DragMain = () => {
//   const [items, setItems] = useState([
//     { id: 1, text: "My Priorities" },
//     { id: 2, text: "My Notepad" },
//   ]);
//   const [activeId, setActiveId] = useState(null);
//   const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
//   const gridRect = useRef(null);

//   function handleDragStart(event) {
//     if (event.active) {
//       setActiveId(event.active.id);
//     }
//   }

//   function handleDragOver(event) {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }

//   function handleDragEnd(event) {
//     setActiveId(null);
//   }

//   function handleDragCancel() {
//     setActiveId(null);
//   }

//   return (
//     <div className={styled.dropContainer}>
//       <DndContext
//         sensors={sensors}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//         onDragCancel={handleDragCancel}
//       >
//         <SortableContext items={items} strategy={() => {}}>
//           <div
//             ref={gridRect}
//             style={{
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               height: "35rem",
//             }}
//           >
//             {items.map((url, index) => (
//               <SortableText key={url.id} id={url.id} url={url} index={index} />
//             ))}
//           </div>
//         </SortableContext>

//         <DragOverlay adjustScale={false}>
//           {activeId ? (
//             <div
//               style={
//                 {
//                   // height: "100%"
//                 }
//               }
//             >
//               <Text url={activeId} />
//             </div>
//           ) : null}
//         </DragOverlay>
//       </DndContext>
//     </div>
//   );
// };

// export default DragMain;

import { closestCenter, DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import ReactQuill from "react-quill";
import styled from "../mainstyle.module.css";
import UserComponent from './UserComponent';
import "react-quill/dist/quill.snow.css";


function DragMain({setNewTask,newTask}) {
  const [value, setValue] = useState("");

  const [items, setItems] = useState([
        { id: 1, name: "My Priorities" },
    { id: 2, name: "My Notepad" },
    { id: 3, name: "My Notepad1" },
   
  ])

  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({active, over}) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div
      className={styled.dropContainer}
    
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
         <div
            // ref={gridRect}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap:"wrap",
              height: "35rem",
            }}
          >
          {
            items.map(
              item => <UserComponent {...item} key={item.id} itemLength={items.length} newTask={newTask} setNewTask={setNewTask} />
            )
          }
          </div>

        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DragMain;

