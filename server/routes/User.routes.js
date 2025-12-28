import express from "express"
import { adminOnly, authorize } from "../middlewares/verifyTokenMiddleware.js";
import {  getUserById, getUsers } from "../controllers/User.controller.js";

const route = express.Router();

// User Management Routes
//http://localhost:8000/api/users
route.get("/", authorize, adminOnly, getUsers); 

//http://localhost:8000/api/users/:id
route.get("/:id", authorize, getUserById);  

    

export default route
