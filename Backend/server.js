const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

//CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://quick-task-share.vercel.app"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.options("*", cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Schema and Model
const taskSchema = new mongoose.Schema({
  tasks: Array,
  createdAt: { type: Date, default: Date.now, expires: "24h" }
});
const TaskList = mongoose.model("TaskList", taskSchema);

// Routes
app.get("/", (req, res) => res.json({ message: "Backend is working!" }));

app.post("/api/tasks", async (req, res) => {
  try {
    const { tasks } = req.body;
    const newTaskList = new TaskList({ tasks });
    await newTaskList.save();
    res.status(201).json({ id: newTaskList._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const taskList = await TaskList.findById(req.params.id);
    if (!taskList) return res.status(404).json({ error: "Task not found" });
    res.json(taskList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
