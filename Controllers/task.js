import { Task } from "../model/task.js";
import errorHandler from "../middleware/error.js";
export const newTask = async (req, res) => {
  const { title, description } = req.body;
  console.log("user", req.user);
  await Task.create({
    title,
    description,
    user: req.user,
  });
  res.status(200).json({
    success: true,
    message: "Task added sucessfully",
  });
};

export const showCurTasks = async (req, res) => {
  try {
    console.log("ho");
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new errorHandler("task khali hai re baba", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new Error("task khali hai re baba"));
    await Task.deleteOne(task);
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
