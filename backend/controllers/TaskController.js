const TaskModel = require("../models/TaskModel");

//POST create task
const createTask = async (request, response) => {
  const data = request.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    response.status(201).json({ message: "Task is created", success: "true" });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Failed to create task", success: false });
  }
};

//GET all tasks
const fetchAllTasks = async (request, response) => {
  try {
    const data = await TaskModel.find({});
    response.status(201).json({ message: "All Tasks", success: "true", data });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Failed to fetch task", success: false });
  }
};

//PUT update task
const updateTaskById = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const obj = { $set: { ...body } }; //The $set operator replaces the value of a field with the specified value.
    await TaskModel.findByIdAndUpdate(id, obj);
    response.status(200).json({ message: "Task updated", success: "true" });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Failed to update task", success: false });
  }
};

//DELETE task
const deleteTaskById = async (request, response) => {
  try {
    const id = request.params.id;
    await TaskModel.findByIdAndDelete(id);
    response.status(200).json({ message: "Task is deleted", success: "true" });
  } catch (err) {
    response
      .status(500)
      .json({ message: "Failed to delete task", success: false });
  }
};

module.exports = { createTask, fetchAllTasks, updateTaskById, deleteTaskById };
