import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
dotenv.config();

const app = express();


app.use(cors());                // Enable CORS for frontend access
app.use(express.json());        // Parse JSON request bodies
app.use(morgan("dev"));         // Logging for requests


app.use("/auth", authRoutes);
app.get("/", (req, res) => res.send("Hello from TypeScript + Node!"));

export default app;
