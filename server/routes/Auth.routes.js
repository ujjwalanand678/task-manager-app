import express from "express"
import { userLogin, userRegister } from "../controllers/Auth.controller.js"

const route = express.Router()

//http://localhost:3000/api/auth/register
route.post("/register", userRegister)


//http://localhost:3000/api/auth/login
route.post("/login", userLogin)

export default route