const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    //res.send("get all tasks");
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
    //console.log(req);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `No task with id : ${taskID}` });
    }
    res.status(200).json({ task });
    //res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate(
      {
        _id: taskID,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      res.status(404).json({ message: `No task with id : ${taskID}` });
    }

    res.status(200).json({ task });
    //res.send("update task");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res
        .status(404)
        .json({ message: `No task found with id ${taskID}` });
    }

    //res.status(200).json({ task });
    res.status(200).json({ task: task, status: "success" });
    //res.send("delete task");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
