import express from "express"
import { adminOnly, authorize } from "../middlewares/verifyTokenMiddleware.js";
import { createTask, deleteTask, getDashboardData, getTaskById, getTasks, getUserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from "../controllers/Task.controller.js";

const route = express.Router();

// Task Management Routes

//http://localhost:3000/api/tasks/dashboard-data
route.get("/dashboard-data", authorize, getDashboardData);
//http://localhost:3000/api/tasks/user-dashboard-data
route.get("/user-dashboard-data", authorize, getUserDashboardData);
//http://localhost:3000/api/tasks/
route.get("/", authorize, getTasks); 

// Get all tasks (Admin: all, User: assigned)

//http://localhost:3000/api/tasks/:id
route.get("/:id", authorize, getTaskById); // Get task by ID

//http://localhost:3000/api/tasks/
route.post("/", authorize, adminOnly, createTask); // Create a task (Admin only)

//http://localhost:3000/api/tasks/:id
route.put("/:id", authorize, updateTask); // Update task details

//http://localhost:3000/api/tasks/:id
route.delete("/:id", authorize, adminOnly, deleteTask); // Delete a task (Admin only)

//http://localhost:3000/api/tasks/:id/status
route.put("/:id/status", authorize, updateTaskStatus); // Update task status

//http://localhost:3000/api/tasks/:id/todo
route.put("/:id/todo", authorize, updateTaskChecklist); // Update task checklist
    

export default route
