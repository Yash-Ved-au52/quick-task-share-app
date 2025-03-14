import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      addTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 bg-white p-3 rounded-lg shadow-lg">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-2 flex-grow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new task"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-2 ml-2 rounded-lg transition-all transform hover:scale-105"
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;