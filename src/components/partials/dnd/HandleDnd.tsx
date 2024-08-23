"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { dndDataSet1, dndDataSet2 } from "./Data";

interface Item {
  id: string;
  text: string;
}

const DragHandleDnd = () => {
  const [dndSet1, setDndSet1] = useState<Item[]>(dndDataSet1);
  const [dndSet2, setDndSet2] = useState<Item[]>(dndDataSet2);

  const move = (
    source: Item[],
    destination: Item[],
    droppableSource: { index: number; droppableId: string },
    droppableDestination: { index: number; droppableId: string }
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: { [key: string]: Item[] } = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const getList = (id: string) => {
    if (id === "droppable1") {
      return dndSet1;
    } else {
      return dndSet2;
    }
  };

  const handleOnDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppable1") {
        const items = Array.from(dndSet1);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setDndSet1(items);
      } else {
        const items = Array.from(dndSet2);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setDndSet2(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setDndSet1(result.droppable1);
      setDndSet2(result.droppable2);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable1">
        {(provided) => (
          <div ref={provided.innerRef} className="col-sm-6">
            <div className="card card-bordered p-4 h-100">
              {dndSet1.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-3 bg-white border border-light round-lg mb-3 dnd-handle"
                    >
                      <span
                        {...provided.dragHandleProps}
                        className="handle"
                      ></span>
                      <span>{item.text}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="droppable2">
        {(provided) => (
          <div ref={provided.innerRef} className="col-sm-6">
            <div className="card card-bordered p-4 h-100">
              {dndSet2.map((item, index) => (
                <Draggable draggableId={item.id} key={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-3 bg-white border border-light round-lg mb-3 dnd-handle"
                    >
                      <span
                        {...provided.dragHandleProps}
                        className="handle"
                      ></span>
                      <span>{item.text}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default DragHandleDnd;
