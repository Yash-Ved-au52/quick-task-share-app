import axios from 'axios';

const API_URL =  import.meta.env.VITE_BACKEND_API;

export const createTaskList = async (tasks) => {
  const response = await axios.post(API_URL, { tasks });
  return response.data;
};

export const getTaskList = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};