import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

const KanbanLane = ({ title, items }) => {
    const { setNodeRef } = useDroppable({
        id: title
    });
    return (
        <div
            style={{
                display: "flex",
                flex: "3",
                padding: "5px",
                flexDirection: "column",
                minHeight: "10rem",
                margin:"0rem .5rem",
                border:"1px solid green"
            }}
        >
            <b>{title}</b>
            <div
                ref={setNodeRef}
                style={{
                    backgroundColor: "gray.200",
                    borderRadius: "8px",
                    flex: "1",
                    padding: "2px",
                    flexDirection: "column"
                }}
            >
                {items.map(({ title: cardTitle }, key) => (
                    <KanbanCard title={cardTitle} key={key} index={key} parent={title} />
                ))}
            </div>
        </div>
    );
};

export default KanbanLane
