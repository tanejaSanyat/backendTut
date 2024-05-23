import express from "express";
import { Router } from "express";
import { isAuthenticated } from "../middleware/Auth.js";
const router = express.Router();
import {
  deleteTask,
  newTask,
  showCurTasks,
  updateTask,
} from "../Controllers/task.js";
router.post("/new", isAuthenticated, newTask);
router.get("/me", isAuthenticated, showCurTasks);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
export default router;
