import express from "express"
import { adminOnly, authorize } from "../middlewares/verifyTokenMiddleware.js";
import { exportTasksReport, exportUsersReport } from "../controllers/Report.controller.js";
const route = express.Router();

//http://localhost:3000/api/reports/export/tasks
route.get("/export/tasks", authorize, adminOnly, exportTasksReport); // Export all tasks as Excel/PDF

//http://localhost:3000/api/reports/export/users
route.get("/export/users", authorize, adminOnly, exportUsersReport); // Export user-task report


export default route