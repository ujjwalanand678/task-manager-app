import express from "express"
import { getUserProfile, updateUserProfile, userLogin, userRegister  } from "../controllers/Auth.controller.js"
import { authorize } from "../middlewares/verifyTokenMiddleware.js"

const route = express.Router()

//http://localhost:3000/api/auth/register
route.post("/register", userRegister)

//http://localhost:3000/api/auth/login
route.post("/login", userLogin)

//http://localhost:3000/api/auth/profile/:id
route.get("/profile/:id",authorize, getUserProfile)

//http://localhost:3000/api/auth/profile
//route.post("/profile/:id",authorize, updateUserProfile)

export default route