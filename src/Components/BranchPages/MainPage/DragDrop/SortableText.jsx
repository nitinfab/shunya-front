import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Text } from "./Text";

export const SortableText = (props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Text
      ref={setNodeRef}
      style={style}
      faded={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};
