import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskView from "./components/TaskView";
import ErrorBoundary from "./components/ErrorBoundary";
import { createTaskList } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskListId, setTaskListId] = useState("");

  const addTask = (taskText) => {
    if (tasks.length < 10) {
      const newTask = {
        id: `task-${Date.now()}`,
        text: taskText,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  const handleShare = async () => {
    try {
      const response = await createTaskList(tasks);
      setTaskListId(response.id);
    } catch (error) {
      console.error("Sharing failed:", error);
      alert("Failed to share task list. Please try again.");
    }
  };

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
                <div className="container mx-auto p-6 max-w-2xl bg-white shadow-xl rounded-lg">
                  <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
                    Quick Task Share
                  </h1>

                  <TaskInput addTask={addTask} />

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <TaskList tasks={tasks} />
                  </DragDropContext>

                  {tasks.length > 0 && (
                    <div className="mt-6">
                      <button
                        onClick={handleShare}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg"
                      >
                        Generate Share Link
                      </button>

                      {taskListId && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                          <p className="text-sm text-gray-700 mb-2">Share this link:</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={`${window.location.origin}/tasks/${taskListId}`}
                              readOnly
                              className="flex-1 p-2 border rounded-lg text-sm bg-white shadow-sm"
                            />
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  `${window.location.origin}/tasks/${taskListId}`
                                )
                              }
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-transform transform hover:scale-105 hover:shadow-lg"
                            >
                              Copy
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Link expires in 24 hours</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route path="/tasks/:id" element={<TaskView />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
