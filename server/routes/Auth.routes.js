import express from "express"
import { getUserProfile, updateUserProfile, userLogin, userRegister  } from "../controllers/Auth.controller.js"
import { authorize } from "../middlewares/verifyTokenMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js"
import { uploadProfileImage } from "../controllers/Upload.controller.js"

const route = express.Router()

//http://localhost:3000/api/auth/register
route.post("/register", userRegister)

//http://localhost:3000/api/auth/login
route.post("/login", userLogin)

//http://localhost:3000/api/auth/profile/
route.get("/profile",authorize, getUserProfile)

//http://localhost:3000/api/auth/profileupdated
route.post("/profileupdated",authorize, updateUserProfile)

//http://localhost:3000/api/auth/upload-image
route.post("/upload-image", upload.single("image"),uploadProfileImage);



export default route