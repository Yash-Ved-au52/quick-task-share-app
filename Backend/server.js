const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const taskSchema = new mongoose.Schema({
  tasks: Array,
  createdAt: { type: Date, default: Date.now, expires: '24h' }
});

const TaskList = mongoose.model('TaskList', taskSchema);

// API routes here...
app.post('/api/tasks', async (req, res) => {
    const { tasks } = req.body;
    const newTaskList = new TaskList({ tasks });
    await newTaskList.save();
    res.json({ id: newTaskList._id });
  });
  
  app.get('/api/tasks/:id', async (req, res) => {
    const taskList = await TaskList.findById(req.params.id);
    res.json(taskList);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));