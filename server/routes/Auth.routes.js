import express from "express"
import { updateUserProfile, userLogin, userRegister } from "../controllers/Auth.controller.js"

const route = express.Router()

//http://localhost:3000/api/auth/register
route.post("/register", userRegister)

//http://localhost:3000/api/auth/login
route.post("/login", userLogin)

//http://localhost:3000/api/auth/profile
// route.get("/profile", getUserProfile)

//http://localhost:3000/api/auth/profile
route.post("/profile", updateUserProfile)

export default route