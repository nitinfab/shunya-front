import { useDraggable } from "@dnd-kit/core";

const KanbanCard = ({ title, index, parent }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: title,
        data: {
            title: title,
            index: index,
            parent: parent
        }
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <div
            style={{
                padding: "3px",
                backgroundColor: "white",
                margin: "2px",
                borderRadius: "8px",
                border: "2px solid gray.500",
                boxShadow: "0px 0px 5px 2px #2121213b",
                ...style
            }}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            {title}
        </div>
    );
};

export default KanbanCard;