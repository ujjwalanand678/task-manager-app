import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import AuthRoutes from "./routes/Auth.routes.js"
import UserRoutes from "./routes/User.routes.js"
import TaskRoutes from "./routes/Task.routes.js"
import ReportRoutes from "./routes/Report.routes.js"
import { fileURLToPath } from "url";
import { dirname } from "path";


const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);

// ES module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//middleware to handle cors policy
const corsPolicy = {
  origin: [process.env.CLIENT_URI,  "http://localhost:8000",
    "http://localhost:5173"],
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
app.use("/api/auth" , AuthRoutes )
app.use("/api/users", UserRoutes)
app.use("/api/tasks" , TaskRoutes)
app.use("/api/reports", ReportRoutes)
// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
});
