import React from 'react';
import { Draggable, Droppable } from "@hello-pangea/dnd";

const TaskList = ({ tasks = [] }) => {
  return (
    <Droppable droppableId="taskList">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`p-4 rounded-lg shadow-lg ${snapshot.isDraggingOver ? "bg-gray-200" : "bg-white"}`}
        >
          <ul className="list-none">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 border border-gray-300 rounded-lg mb-2 bg-white shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                    >
                      <p className="text-black">{task.text}</p>
                    </li>
                  )}
                </Draggable>
              ))
            ) : (
              <li className="text-gray-400 text-center p-2">No tasks available</li>
            )}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;