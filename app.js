import express from "express";
import mongoose from "mongoose";
import { User } from "./model/user.js";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
import { errorMiddleware } from "./middleware/error.js";
export const app = express();
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
config({
  path: "./database/config.env",
});
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/users", userRouter);
app.use(errorMiddleware);
