const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateTaskStatus = async (req, res) => {
  try {
    // update task
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // count tasks
    const totalTasks = await Task.countDocuments({ project: task.project });

    // count completed
    const completedTasks = await Task.countDocuments({
      project: task.project,
      status: "completed",
    });

    // calculate %
    const progress = Math.round((completedTasks / totalTasks) * 100);

    // update project
    await Project.findByIdAndUpdate(task.project, { progress });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
