import express from "express"
import { adminOnly, authorize } from "../middlewares/verifyTokenMiddleware.js";
import { deleteUser, getUserById, getUsers } from "../controllers/User.controller.js";

const route = express.Router();

// User Management Routes
route.get("/", authorize, adminOnly, getUsers);               
route.get("/:id", authorize, getUserById);                 
route.delete("/:id", authorize, adminOnly, deleteUser);       

export default route
