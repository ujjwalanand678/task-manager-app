import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
mongoose.set("strictQuery", false);

//middleware to handle cors policy
const corsPolicy = {
  origin: [process.env.CLIENT_URI, "*"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type"],
};

//connect to DataBase
connectDB();

// Middleware to parse JSON request bodies
app.use(cors(corsPolicy));
app.use(express.json());

//Routes
// app.use("api/auth")
// app.use("api/users")
// app.use("api/tasks")
// app.use("api/reports")

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
});
