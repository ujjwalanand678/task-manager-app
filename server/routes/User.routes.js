import express from "express"
import { adminOnly, authorize } from "../middlewares/verifyTokenMiddleware.js";
import { deleteUser, getUserById, getUsers } from "../controllers/User.controller.js";

const route = express.Router();

// User Management Routes
//http://localhost:3000/api/users
route.get("/", authorize, adminOnly, getUsers); 

//http://localhost:3000/api/users/:id
route.get("/:id", authorize, getUserById);  

route.delete("/:id", authorize, adminOnly, deleteUser);       

export default route
