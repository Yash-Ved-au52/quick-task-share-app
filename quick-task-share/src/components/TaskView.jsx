import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskList } from '../api';

const TaskView = () => {
  const { id } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTaskList(id);
        if (!data?.tasks) {
          throw new Error('Invalid task list format');
        }
        setTaskList(data.tasks);
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to load task list');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-black">Loading task list...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h2>Error loading task list</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Shared Task List
        </h1>
        <ul className="list-none">
          {taskList.map((task) => (
            <li key={task.id} className="border p-3 mb-2 rounded-lg bg-white shadow-lg">
              <p className="text-black">{task.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskView;